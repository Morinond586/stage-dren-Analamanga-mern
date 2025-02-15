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
  FaDochub,
  FaList,
  FaNewspaper,
  FaProjectDiagram,
  FaSignOutAlt,
  FaTasks,
  FaUser,
} from "react-icons/fa";
import { MdNewspaper, MdStadium } from "react-icons/md";
import { Link } from "@mui/material";

function SidbarActiviter() {
  return (
    <div>
      <div className="sidebars">
        <div className="logo"></div>
        <ul className="menu">
          <li style={{ marginLeft: "-20px" }}>Activiter</li>
          <li className="d-flex">
            <a href="/menu">
              <FaArrowLeft size={24} /> Aceuil
            </a>
          </li>
          <li className="active d-flex">
            <a href="/statAttestation">
              <FaChartLine className="icons" size={24} />
              <span>Dasboard</span>
            </a>
          </li>
          <li className="d-flex">
            <a href="/uploadcrud">
              <FaTasks className="icons" size={24} />
              <span>Rapports</span>
            </a>
          </li>
             <li className="d-flex">
            <a href="/attestation">
              <FaNewspaper className="icons" size={24} />
              <span>Attestations</span>
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

export default SidbarActiviter;
