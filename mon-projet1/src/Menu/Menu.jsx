import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "./menu.css";
import log from "../images/logo.jpg";
import logo from "../images/logoDREN8ANALAMANGA.jpg";
import Rep from "../images/republique-madagascar.jpg";

function Menu() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    Axios.post("http://localhost:7000/admin/login", {
      email,
      password,
    })
    .then(response => {
      if (response.data.token) {
        Swal.fire({
          icon: 'success',
          title: 'Connexion réussie!',
          text: 'Bienvenue, vous êtes connecté.',
        }).then(() => {
          navigate('/pages');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Échec de la connexion',
          text: 'Identifiants invalides.',
        });
      }
    })
    .catch(err => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'La connexion a échoué. Veuillez vérifier vos identifiants.',
      });
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleLinkClick = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 4000);
  };

  return (
    <div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Veuillez patienter s'il vous plaît</p>
        </div>
      )}

      <header className="head">
        <div className="header">
          <div className="logo-left d-flex">
            <img src={log} alt="Logo" className='m-2'/>
          </div>
          <div>
            <div className="logo-right mt-1" style={{ width: '60%', textAlign: 'center' }}>
              <img src={Rep} alt="Logo1" />
            </div>
            <p className="title">
              Repobilikan'ny Madagasikara <br /> 
            </p>
            <p style={{ textAlign: 'center' }}>Fitiavana-Tanindrazana-Fandrosoana</p>
          </div>
          <div className="logo-left d-flex">
            <img src={logo} alt="Logo" className='m-2'/>
          </div>
        </div>

        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">DREN</span>
            <span className="heading-primary--sub">Analamanga</span>
          </h1>
          <hr className="p-4"></hr>
          <button className="btn btn--white btn--animated">
            <a href="#admin" style={{ color: 'black' }}>Administrateur Dren</a> 
          </button>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <button onClick={() => handleLinkClick('/appli')} className="btn btn--white btn--animated">
            Rapport d'activité
          </button>
          <button
            onClick={() => handleLinkClick('/demandeAttestation')}
            className="btn btn--white btn--animated cursor-pointer bg-white text-success font-semibold log"
          >
            Attestation BEPC
          </button>
          <button onClick={() => handleLinkClick('/')} className="btn btn--white btn--animated">
            Log Out
          </button>
        </div>
      </header>

      <div className="text-center hed">
        <h1>Géstion d'activité et d'Attestation BEPC
          <br /> ********* <br />  
        </h1>
        <p>Direction Régionale de L'Educations Nationale</p>
        <p>Nanisana Antananarivo</p>
      </div>

      <div className="row">
        <div className="book" id="admin">
          <div className="book__form">
            <form className="form" onSubmit={handleSubmit}>
              <div className="u-margin-bottom-medium">
                <h2 className="heading-secondary">Administrateur</h2>
              </div>

              <div className="form__group">
                <input
                  type="email"
                  className="form__input"
                  placeholder="Adresse Email"
                  autoComplete='off'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email" className="form__label">
                  Email
                </label>
              </div>

              <div className="form__group">
                <input
                  type="password"
                  className="form__input"
                  placeholder="Mot de passe"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password" className="form__label">
                  Mot de passe
                </label>
              </div>
              <div className="d-flex">
                <div className="form__group">
                  <button className="btn btn--green" type='submit'>se connecter &rarr;</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer__logo-box">
        </div>
        <div className="row">
          <div className="col-1-of-2">
            <div className="footer__navigation">
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Historique
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Contact
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Adresse
                  </a>
                </li>
                <li className="footer__item">
                  <a href="https://mg.wikipedia.org/wiki/Faritra_Analamanga" className="footer__link">
                    Région
                  </a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">
                    Companie
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-1-of-2">
            <p className="footer__copyright">
              Built by{" "}
              <a href="#" className="footer__link">
                Morinond Vital
              </a>{" "}
              for his online course of Jonas Schmedtmann{" "}
              <a href="#" className="footer__link">
                Designed by Morinond
              </a>
              . Copyright &copy; by Jonas Schmedtmann. You are 100% allowed to
              use this webpage for both personal and commercial use, but NOT to
              claim it as your own design. A credit to the original author,
              Jonas Schmedtmann, is of course highly appreciated!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Menu;
