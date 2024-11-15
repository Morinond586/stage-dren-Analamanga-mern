import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./login.css";

function LoginSignup() {
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const startsWithDren = password.startsWith("Dren");
    return password.length >= minLength && startsWithDren;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Simulate a loading delay of 4 seconds
    await new Promise((resolve) => setTimeout(resolve, 4000));

    let validationErrors = {};

    if (isForgotPassword) {
      if (!formData.email) validationErrors.email = "Entrez votre email";
      if (formData.email && !validateEmail(formData.email))
        validationErrors.email = "Adresse email invalide";
      if (!formData.newPassword) validationErrors.newPassword = "Entrez votre nouveau mot de passe";
      if (!formData.confirmPassword) validationErrors.confirmPassword = "Confirmez votre nouveau mot de passe";
      if (formData.newPassword !== formData.confirmPassword)
        validationErrors.confirmPassword = "Les mots de passe ne correspondent pas";

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoading(false); // Stop loading
        return;
      }

      try {
        await axios.post("http://localhost:7000/reset-password", {
          token: formData.token,
          newPassword: formData.newPassword,
        });
        Swal.fire("Succès", "Mot de passe réinitialisé avec succès !", "success"); // Success message
        setIsForgotPassword(false);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Erreur", "Une erreur est survenue lors de la réinitialisation du mot de passe", "error"); // Error message
      }
    } else {
      if (isRegister) {
        if (!formData.name) validationErrors.name = "Entrez votre nom";
        if (!formData.prenom) validationErrors.prenom = "Entrez votre prénom";
        if (!formData.email) validationErrors.email = "Entrez votre email";
        if (formData.email && !validateEmail(formData.email))
          validationErrors.email = "Adresse email invalide";
        if (!formData.password) validationErrors.password = "Entrez votre mot de passe";
        if (formData.password && !validatePassword(formData.password))
          validationErrors.password = "vous avez rencontrer d'erreur sur le mot de passe !! Contactez directement le responsable de ce ssystem";
        if (!formData.dateOfBirth) validationErrors.dateOfBirth = "Entrez votre date de naissance";
        if (!formData.description) validationErrors.description = "Entrez votre description";

        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setLoading(false); // Stop loading
          return;
        }

        try {
          const formDataToSend = new FormData();
          Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
          });
          await axios.post("http://localhost:7000/register", formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          Swal.fire("Succès", "Inscription réussie !", "success"); // Success message
          setIsRegister(false);
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message === "Adresse email déjà existante") {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "Adresse email déjà existante",
            }));
          } else {
            console.error("Error:", error);
            Swal.fire("Erreur", "Une erreur est survenue", "error"); // Error message
          }
        }
      } else {
        if (!formData.email) validationErrors.email = "Entrez votre email";
        if (formData.email && !validateEmail(formData.email))
          validationErrors.email = "Adresse email invalide";
        if (!formData.password) validationErrors.password = "Entrez votre mot de passe";
        if (formData.password && !validatePassword(formData.password))
          validationErrors.password = "Contactez directement le responsable de ce ssystem";

        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setLoading(false); // Stop loading
          return;
        }

        try {
          const { data } = await axios.post("http://localhost:7000/login", formData);
          localStorage.setItem("token", data.token);
          Swal.fire("Succès", "Connexion réussie !", "success"); // Success message
          navigate("/menu");
        } catch (error) {
          console.error("Error:", error);
          Swal.fire("Erreur", "Mot de passe incorrect", "error"); // Error message
        }
      }
    }
    setLoading(false); // Stop loading
  };

  return (
    <div className="body">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="content justify-content-center align-items-center d-flex shadow-lg" id="content">
        {/* Formulaire de Connexion */}
        {!isForgotPassword && !isRegister && (
          <div className="col-md-6 d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
              <div className="header-text mb-4">
                <h1>Connexion</h1>
              </div>
              {errors.email && <div className="text-danger">{errors.email}</div>}
              <div className="input-group mb-3">
                <input type="email" name="email" placeholder="Email" className="form-control form-control-lg bg-light fs-6" onChange={handleChange} />
              </div>
              {errors.password && <div className="text-danger">{errors.password}</div>}
              <div className="input-group mb-3">
                <input type="password" name="password" placeholder="Password" className="form-control form-control-lg bg-light fs-6" onChange={handleChange} />
              </div>
              {/* <div className="input-group mb-5 justify-content-between">
                <div className="forgot">
                  <small><a onClick={() => setIsForgotPassword(true)}>Mot de passe oublié</a></small>
                </div>
              </div> */}
              <div className="input-group mb-3 justify-content-center">
                <button className="btnl border-white text-white w-50 fs-6">Connecter</button>
              </div>
              <div className="text-center">
                <button type="button" className="btnl" onClick={() => setIsRegister(true)}>Créer un compte</button>
              </div>
            </form>
          </div>
        )}

        {/* Formulaire d'Inscription */}
        {isRegister && (
          <div className="col-md-6 d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
              <div className="header-text mb-4">
                <h1>Créer compte</h1>
              </div>
              {errors.name && <div className="text-danger">{errors.name}</div>}
              <div className="input-group mb-3">
                <input type="text" name="name" placeholder="Nom*:" className="form-control form-control-lg bg-light fs-6" onChange={handleChange} />
              </div>
              {errors.prenom && <div className="text-danger">{errors.prenom}</div>}
              <div className="input-group mb-3">
                <input type="text" name="prenom" placeholder="Prénom*:" className="form-control form-control-lg bg-light fs-6" onChange={handleChange} />
              </div>
              {errors.email && <div className="text-danger">{errors.email}</div>}
              <div className="input-group mb-3">
                <input type="email" name="email" placeholder="Email*:" className="form-control form-control-lg bg-light fs-6" onChange={handleChange} />
              </div>
              {errors.password && <div className="text-danger">{errors.password}</div>}
              <div className="input-group mb-3">
                <input type="password" name="password" placeholder="Password*:" className="form-control form-control-lg bg-light fs-6" onChange={handleChange} />
              </div>
              {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
              <div className="input-group mb-3">
                <input type="text" name="dateOfBirth" placeholder="Date de Naissance*:" className="form-control form-control-lg bg-light fs-6" onChange={handleChange} />
              </div>
              {errors.description && <div className="text-danger">{errors.description}</div>}
              <div className="input-group mb-3">
                <input type="text" name="description" placeholder="Description*:" className="form-control form-control-lg bg-light fs-6" onChange={handleChange} />
              </div>
              <div className="input-group mb-3">
                <input type="file" name="photo" placeholder="Photo" className="form-control form-control-lg bg-light fs-6" onChange={handleChange} />
              </div>
              <div className="input-group mb-3 justify-content-center">
                <button className="btnl border-white text-white w-50 fs-6">Créer</button>
              </div>
              <div className="text-center">
                <button type="button" className="btnl" onClick={() => setIsRegister(false)}>Déjà un compte</button>
              </div>
            </form>
          </div>
        )}

        {/* Formulaire de Réinitialisation du Mot de Passe */}
        {isForgotPassword && (
          <div className="col-md-6 d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
              <div className="header-text mb-4">
                <h1>Réinitialiser le Mot de Passe</h1>
              </div>
              {errors.email && <div className="text-danger">{errors.email}</div>}
              <div className="input-group mb-3">
                <input type="email" name="email" placeholder="Email" className="form-control form-control-lg bg-light fs-6" onChange={handleChange} />
              </div>
              {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
              <div className="input-group mb-3">
                <input type="password" name="newPassword" placeholder="Nouveau Mot de Passe" className="form-control form-control-lg bg-light fs-6" onChange={handleChange} />
              </div>
              {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
              <div className="input-group mb-3">
                <input type="password" name="confirmPassword" placeholder="Confirmer Nouveau Mot de Passe" className="form-control form-control-lg bg-light fs-6" onChange={handleChange} />
              </div>
              <div className="input-group mb-3 justify-content-center">
                <button className="btnl border-white text-white w-50 fs-6">Réinitialiser le Mot de Passe</button>
              </div>
              <div className="text-center">
                <button type="button" className="btnl" onClick={() => setIsForgotPassword(false)}>Retour à la Connexion</button>
              </div>
            </form>
          </div>
        )}

        {/* Panneau de Basculage */}
        <div className="switch-content">
          <div className="switch">
            <div className="switch-pannel switch-left text-center">
              <h1>DREN</h1>
              <h1>Nanisana Antananarivo</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
