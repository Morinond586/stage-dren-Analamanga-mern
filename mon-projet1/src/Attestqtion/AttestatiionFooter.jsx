// src/components/Footer.js

import React from 'react';
import './FooterAt.css'; // Assurez-vous de créer ce fichier CSS pour le style

const AttestationFooter = () => {
  return (
    <footer className="footers">
      <div className="footer-content">
        <p>&copy; 2024 Gestion d'Attestations. Tous droits réservés.</p>
        <ul className="footer-links">
          <li><a href="/about">À propos</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Politique de confidentialité</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default AttestationFooter;
