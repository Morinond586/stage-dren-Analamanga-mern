import React from "react";
import "./Attestyle.css";
import {
  FaArrowLeft,
  FaChartLine,
  FaSignOutAlt,
  FaTasks,
  FaUser,
} from "react-icons/fa";
import { MdNewspaper } from "react-icons/md";

function SiebarAttestation() {
  return (
    <div>
      <div className="sidebars">
        <div className="logo"></div>
        <ul className="menu">
          <li style={{ marginLeft: "-20px" }}>SGES</li>
          <li className="d-flex">
            <a href="/menu">
              <FaArrowLeft size={24} /> Aceuil
            </a>
          </li>
          <li className="d-flex">
            <a href="/statAttestation">
              <FaChartLine className="icons" size={24} />
              <span>Statistiques</span>
            </a>
          </li>
          <li className="d-flex active">
            <a href="/demandeAttestation">
              <FaTasks className="icons" size={24} />
              <span>Demandes</span>
            </a>
          </li>
          <li className="d-flex">
          <a href="/attestation">
              <MdNewspaper className="icons" size={24} />
              <span>ResultatBEPC</span>
            </a>
          </li>
          
          <li className="d-flex">
            <a href="/userprofil">
              <FaUser className="icons" size={24} />
              <span>Profile</span>
            </a>
          </li>
          <li className="logout d-flex">
            <a href="/stage-dren-Analamanga-mern">
              <FaSignOutAlt size={24} />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SiebarAttestation;
