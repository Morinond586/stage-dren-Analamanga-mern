import React from "react";
import "../Attestqtion/Attestyle.css";

// import
// {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify, BsList, BsPerson, BsChatRight, BsGraphDown, BsFillArrowDownRightSquareFill}
// from 'react-icons/bs';
import {
  FaArrowLeft,
  FaBackspace,
  FaBackward,
  FaChartLine,
  FaCog,
  FaDashcube,
  FaDiagnoses,
  FaList,
  FaProjectDiagram,
  FaSignOutAlt,
  FaTasks,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { MdBrowserNotSupported, MdNewspaper, MdStadium, MdWork } from "react-icons/md";
import { Link } from "@mui/material";

function SidbarServer() {
  return (
    <div>
      <div className="sidebars">
        <div className="logo"></div>
        <ul className="menu">
          {/* <li style={{ marginLeft: "-20px" }}>DREN ANALAMANGA</li> */}
          <li className="d-flex">
            <a href="/menu">
              <FaArrowLeft size={24} /> Aceuil
            </a>
          </li>

          <li className="d-flex">
            <a href="/pages">
              <FaChartLine className="icons" size={24} />
              <span>Statistique</span>
            </a>
          </li>

          <li className="nav-item">
          <MdNewspaper className="icons" size={24} />
          <a
            className="nav-link collapsed"
            data-bs-target="#spr-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            {/* <i className="bi bi-journal-text"></i> */}
            {/* <FaTasks className="icons" size={24} /> */}
            <span style={{marginTop: '-30%', marginLeft: '25%'}}>Attestations</span>
            <i className="bi bi-chevron-down"></i>
          </a>
          <ul
            id="spr-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
               <li>
              <a href="/serverAttestation">
                {/* <i className="bi bi-circle"></i> */}
                <span>Acquis</span>
              </a>
            </li>
            <li>
              <a href="/ServerDemandeAttestation">
                {/* <i className="bi bi-circle"></i> */}
                <span>Demandes</span>
              </a>
            </li>
            <li>
              <a href="#">
                {/* <i className="bi bi-circle"></i> */}
                <span>Statistiques</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <MdWork className="icons" size={24} />
          <a
            className="nav-link collapsed"
            data-bs-target="#activiter"
            data-bs-toggle="collapse"
            href="#"
          >
            {/* <i className="bi bi-journal-text"></i> */}
            {/* <FaTasks className="icons" size={24} /> */}
            <span style={{marginTop: '-30%', marginLeft: '25%'}}>Activiter</span>
            <i className="bi bi-chevron-down"></i>
          </a>
          <ul
            id="activiter"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
               <li>
              <a href="/table">
                {/* <i className="bi bi-circle"></i> */}
                <span>Rapports</span>
              </a>
            </li>
            <li>
              <a href="#">
                {/* <i className="bi bi-circle"></i> */}
                <span>Statistiques</span>
              </a>
            </li>
          </ul>
        </li>
        
          <li className="d-flex">
            <a href="/ToutsProfilsUsers">
              <FaUsers className="icons" size={24} />
              <span>Profile</span>
            </a>
          </li>
          <li className="d-flex">
            <a href="/signup">
              <FaCog size={24} />
              <span>S'inscrire</span>
            </a>
          </li>

          <li className="logout d-flex">
            <a href="/menu">
              <FaSignOutAlt size={24} />
              <span>Déconnecter</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidbarServer;
