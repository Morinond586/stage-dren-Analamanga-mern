import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Assurez-vous d'avoir ce fichier CSS pour les styles du modal

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/'); // Redirige vers la page de connexion si le token n'existe pas
          return;
        }

        const { data } = await axios.get('http://localhost:7000/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(data);
        setFormData({
          name: data.name,
          prenom: data.prenom,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          description: data.description,
          photo: data.photo
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        localStorage.removeItem('token');
        navigate('/'); // Redirige vers la page de connexion en cas d'erreur
      }
    };

    fetchUser();
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0] // On stocke le fichier photo
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formDataObj = new FormData();
  
    // Ajoutez les données du formulaire à FormData
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });
  
    try {
      await axios.put('http://localhost:7000/user', formDataObj, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsEditing(false);
      
      // Rafraîchissez les données de l'utilisateur après la mise à jour
      const { data } = await axios.get('http://localhost:7000/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Description: {user.description}</p>
          <p>Date of Birth: {user.dateOfBirth}</p>
          {user.photo && <img src={`http://localhost:7000/uploads/${user.photo}`} alt="User Photo" className="profile-photo" />}
          <button onClick={handleEditClick} className='m-3'>Edit Profile</button>
          <button className='m-3' onClick={() => {
            localStorage.removeItem('token');
            navigate('/login'); // Redirige vers la page de connexion lors de la déconnexion
          }}>Logout</button>

          {/* Modal for Editing User */}
          {isEditing && (
            <div className="modal-overlay">
              <div className="modal-contents">
                <button className="modal-close" onClick={handleCloseModal}>×</button>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                  <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                  </label>
                  <label>
                    Prenom:
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
                  </label>
                  <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                  </label>
                  <label>
                    Date of Birth:
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                  </label>
                  <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                  </label>
                  <label>
                    Photo:
                    <input type="file" name="photo" onChange={handleFileChange} />
                  </label>
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleCloseModal}>Cancel</button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
