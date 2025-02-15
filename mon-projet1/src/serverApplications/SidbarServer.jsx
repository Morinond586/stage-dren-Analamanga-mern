import React from "react";
import "../Attestqtion/Attestyle.css";

import {
  FaArrowLeft,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import {  MdNewspaper } from "react-icons/md";
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
          <Link
            className="nav-link collapsed"
            data-bs-target="#spr-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            {/* <i className="bi bi-journal-text"></i> */}
            {/* <FaTasks className="icons" size={24} /> */}
            <span style={{marginTop: '-30%', marginLeft: '25%'}}>Attestations</span>
            <i className="bi bi-chevron-down"></i>
          </Link>
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
