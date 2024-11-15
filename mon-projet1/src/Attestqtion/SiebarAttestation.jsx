import React from "react";
import "./Attestyle.css";
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
} from "react-icons/fa";
import { MdNewspaper, MdStadium } from "react-icons/md";
import { Link } from "@mui/material";

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
          {/* <li className="active d-flex">
            <a href="/statAttestation">
              <FaChartLine className="icons" size={24} />
              <span>Statistique</span>
            </a>
          </li> */}
          <li className="d-flex active">
            <a href="/demandeAttestation">
              <FaTasks className="icons" size={24} />
              <span>Demandes</span>
            </a>
          </li>
          <li className="d-flex">
          <a href="/attestation">
              <MdNewspaper className="icons" size={24} />
              <span>Attestation</span>
            </a>
          </li>
          <li className="d-flex">
            <a href="/uploadcrud">
              <FaTasks className="icons" size={24} />
              <span>Rapports</span>
            </a>
          </li>
          <li className="d-flex">
            <a href="/userprofil">
              <FaUser className="icons" size={24} />
              <span>Profile</span>
            </a>
          </li>
          {/* <li className="d-flex">
            <a href="">
              <FaCog size={24} />
              <span>Parametre</span>
            </a>
          </li> */}

          <li className="logout d-flex">
            <a href="/">
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
