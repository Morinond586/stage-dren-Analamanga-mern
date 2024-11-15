import React from "react";
import "../components/sidBar.css";
// import navList from "../data/navItem";
// import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import {
    BsGrid1X2Fill,
    BsMenuButtonWideFill,
    BsFillArchiveFill,
    BsFillGrid3X3GapFill,
    BsFillEnvelopeFill,
    BsPersonCircle,
    BsFillGearFill,
    BsPeopleFill,
    BsJustify,
    BsListCheck,     
    BsFillBellFill
  } from "react-icons/bs";
  import { FaArrowLeft } from 'react-icons/fa';

function ContenuSidebar() {
  return (
    <aside id="sidebar" className="sidebar">
      
      <ul className="sidebar-nav" id="sidebar-nav">
      <li className="nav-item">
          <a className="nav-link">
            {/* <i className="bi bi-grid"></i>   */}
            <span><Link to={''}>Service SOOR</Link>
            </span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
          <FaArrowLeft className="m-2"/> 
            <span><Link to={'/'}>Aceuil</Link>
            </span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <i className="bi bi-grid"></i>  
            <span><Link to={'/appli'}>Tableau de bord</Link>
            </span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link">
          <i className="bi bi-list"></i>  
            <span>
              <Link to={'/uploadcrud'}>Rapports d'activité</Link>
            </span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link">
          <i className="bi bi-archive"></i>  
            <span>
              <Link to={'/archive'}>Archives</Link>
            </span>
          </a>
        </li>

        <li className="nav-heading">Parametre</li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#spr-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            {/* <i className="bi bi-journal-text"></i> */}
            <BsPersonCircle className='icon'/> Profile
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="spr-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
               <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Admin</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>User</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#sges-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            {/* <i className="bi bi-layout-text-window-reverse"></i> */}
            <BsFillGearFill className='icon'/> Parametre
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="sges-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Compte Profil</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Echange mot de passe</span>
              </a>
            </li>
          </ul>
        </li>

    
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#ccee-nav"
            data-bs-toggle="collapse"
            href="#"
          >
              <BsPeopleFill className='icon'/> Creer compte
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="ccee-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Compte User</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item mt-2">
          <a
            className="nav-link"
          >
           <i className='bi bi-box-arrow-right'></i>
            <span>Log Out</span>
          </a>
        </li>


        {/* <li className="nav-heading">Pages</li>
        {navList.map((nav) => (
          <NavItem key={nav._id} nav={nav} />
        ))} */}
      </ul>
    </aside>
  );
}

export default ContenuSidebar;
