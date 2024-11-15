import React from "react";
import "./sidBar.css";
// import navList from "../data/navItem";
// import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
// import {
//   BsListCheck,     
// } from "react-icons/bs";

function SidBar() {
  return (
    <aside id="sidebar" className="sidebar">
      
      <ul className="sidebar-nav" id="sidebar-nav">
      <li className="nav-item">
          <a className="nav-link">
          <FaArrowLeft /> 
            <span><Link to={'/'}>Aceuil</Link>
            </span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <i className="bi bi-grid"></i>  
            <span><Link to={'/pages'}>Tableau de bord</Link>
            </span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link">
          <i className="bi bi-list"></i>  
            <span>
              <Link to={'/list'}>List de rapports</Link>
            </span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link">
          <i className="bi bi-list"></i>  
            <span>
              <Link to={'/serverAttestation'}>List d'Attestations</Link>
            </span>
          </a>
        </li>

        
        <li className="nav-heading">Consulter services</li>
  

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#ssor"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-menu-button-wide"></i>
            <span>SSOR</span>
            <span className="message-count bg-warning m-2 badge ">15</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="ssor"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <Link to={'/listd'}>Planification</Link>
                <span className="message-count bg-warning m-2 badge ">2</span>

              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Suppliers</span>
                <span className="message-count bg-warning m-2 badge ">10</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>logistic</span>
                <span className="message-count bg-warning m-2 badge ">3</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#spr-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-journal-text"></i>
            <span>SPR</span>
            <span className="message-count bg-warning m-2 badge ">2</span>
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
                <span>Application form</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Release form</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Cancellation form</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
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
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>SGES</span>
            <span className="message-count bg-warning m-2 badge ">2</span>
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
                <span>General Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Data Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
          </ul>
        </li>

       
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#sgrh-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>SGRH</span>
            <span className="message-count bg-warning m-2 badge ">2</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="sgrh-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>General Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Data Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
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
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>CCEE</span>
            <span className="message-count bg-warning m-2 badge ">2</span>
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
                <span>General Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Data Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#sipfaj-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>SIPFAJ</span>
            <span className="message-count bg-warning m-2 badge ">2</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="sipfaj-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>General Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Data Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#siep-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>SIEP</span>
            <span className="message-count bg-warning m-2 badge ">2</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="siep-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>General Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Data Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#scaiiaf-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>SCAIIAF</span>
            <span className="message-count bg-warning m-2 badge ">2</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="scaiiaf-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>General Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Data Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#saf-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>SAF</span>
            <span className="message-count bg-warning m-2 badge ">2</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="saf-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>General Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Data Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#br-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>BR</span>
            <span className="message-count bg-warning m-2 badge ">2</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="br-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>General Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Data Table</span>
                <span className="message-count bg-warning m-2 badge ">2</span>
              </a>
            </li>
          </ul>
        </li>

        {/* <li className="nav-heading">Pages</li>
        {navList.map((nav) => (
          <NavItem key={nav._id} nav={nav} />
        ))} */}
      </ul>
    </aside>
  );
}

export default SidBar;
