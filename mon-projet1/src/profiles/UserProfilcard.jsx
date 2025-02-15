import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Userprofilcard.css";
import profil from "../images/user_100px.png";
import HeaderAtestation from "../Attestqtion/HeaderAtestation";
import AttestationFooter from "../Attestqtion/AttestatiionFooter";
import BackToTop from "../Interface/BackToTop";

const UserProfilcard = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [isEditing, setIsEditing] = useState(false); // State to control edit modal visibility
  const [formData, setFormData] = useState({}); // State for form data
  const [isChangingPassword, setIsChangingPassword] = useState(false); // State to control password change modal visibility
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming new password
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage
      if (!token) {
        navigate("/"); // Redirect to home if not authenticated
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:7000/user", {
          headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
        });
        setUser(data); // Set user data
        setFormData({
          name: data.name,
          prenom: data.prenom,
          email: data.email,
          dateOfBirth: data.dateOfBirth, // Assuming dateOfBirth is in YYYY-MM-DD format
          description: data.description,
          photo: data.photo,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token"); // Remove token if there's an error
        navigate("/"); // Redirect to home
      }
    };

    fetchUser(); // Call the function to fetch user data
  }, [navigate]);

  // Handle click to edit profile
  const handleEditClick = () => setIsEditing(true);
  // Close the editing modal
  const handleCloseModal = () => setIsEditing(false);
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update form data state
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] }); // Update photo in form data
  };

  // Handle form submission for updating user data
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const token = localStorage.getItem("token"); // Get token
    const formDataObj = new FormData(); // Create a FormData object
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]); // Append form data to FormData object
    });

    try {
      await axios.put("http://localhost:7000/user", formDataObj, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
          "Content-Type": "multipart/form-data", // Set content type
        },
      });
      setIsEditing(false); // Close the modal
      // Refresh user data after update
      const { data } = await axios.get("http://localhost:7000/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data); // Update user data
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle password change form submission
  const handleChangePassword = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (newPassword !== confirmPassword) { // Check if passwords match
      alert("Passwords do not match.");
      return;
    }

    const token = localStorage.getItem("token"); // Get token

    try {
      await axios.post(
        "http://localhost:7000/change-password", // Endpoint to change password
        { newPassword }, // Send new password
        {
          headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
        }
      );
      alert("Password changed successfully."); // Alert on success
      setIsChangingPassword(false); // Close the modal
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div>
      <HeaderAtestation />
      <div className="container" style={{ marginTop: "200px" }}>
        <div className="tabular--wrapper">
          <div className="header--wrapper">
            <div className="upc">
              <div className="gradiant"></div>
              {user ? ( // Render user data if available
                <div className="profile-down">
                  <img src={profil} alt="" />
                  <div className="profile-description text-center">
                    <div>
                      <h2>
                        {user.name} {user.prenom}
                      </h2>
                      <p>Email: {user.email}</p>
                      <p>
                        {/* Display user's description and date of birth */}
                        A propos de moi: {user.description} et né(e) le {user.dateOfBirth}
                      </p>
                      <div className="">
                        <button onClick={handleEditClick} className="m-3">
                          Modifier Information
                        </button>

                        <button onClick={() => setIsChangingPassword(true)} className="m-3">
                          Changer Mot de Passe
                        </button>
                        <button
                          className="m-3"
                          onClick={() => {
                            localStorage.removeItem("token"); // Logout
                            navigate("/stage-dren-Analamanga-mern");
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading...</p> // Loading state
              )}
            </div>

            <div className="navroute">
              <nav>
                <ul>
                  <li>
                    <p>
                      <Link to="/menu">Acceuil</Link>
                    </p>
                  </li>
                  <li>
                    <p>
                      <Link to="/appli">Rapports d'activiter</Link>
                    </p>
                  </li>
                  <li>
                    <p>
                      <Link to="/statAttestation">Attestations</Link>
                    </p>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Modal for Editing User */}
            {isEditing && (
              <div className="modal-overlay">
                <div className="modal-contents" style={{backgroundColor: 'rgba(113, 99, 186, 255)'}}>
                  <button className="modal-close" onClick={handleCloseModal}>
                    ×
                  </button>
                  <h2>Edit Profile</h2>
                  <form onSubmit={handleSubmit}>
                    <label>
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Prenom:
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Email:
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Date of Birth:
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </label>
                    <label>Description:</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      style={{ height: "50px", borderRadius: '2px' }}
                    />
                    <label>
                      Photo:
                      <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                      />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCloseModal}>
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Modal for Changing Password */}
            {isChangingPassword && (
              <div className="modal-overlay">
                <div className="modal-contents" style={{backgroundColor: 'rgba(113, 99, 186, 255)'}}>
                  <button
                    className="modal-close"
                    onClick={() => setIsChangingPassword(false)}
                  >
                    ×
                  </button>
                  <h2>Change Password</h2>
                  <form onSubmit={handleChangePassword}>
                    <label>
                      New Password:
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Confirm Password:
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </label>
                    <button type="submit">Change Password</button>
                    <button
                      type="button"
                      onClick={() => setIsChangingPassword(false)}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <AttestationFooter />
      <BackToTop />
    </div>
  );
};

export default UserProfilcard;
