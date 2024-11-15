import React from 'react'
import './HeaderStyle.css'
import logo from "../images/logo.jpg";
import logo1 from "../images/logoDREN8ANALAMANGA.jpg";
import Rep from "../images/republique-madagascar.jpg";
// import icon vient react-icon
// import 
// {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
// from 'react-icons/bs';

function HeaderAtestation({OpenSidebar}) {
  return (
  <header className="header">
    <div className="logo-left d-flex">
    <img src={logo} alt="Logo" className='m-2'/>
    <img src={logo1} alt="Logo" className='m-2'/>
    </div>
    <h1 className="title" style={{fontFamily: 'Times New Roman'}}>Service de la gestion des etablissement scolaires <br/> Analamanga</h1>
    <div className="logo-right">
    <img src={Rep} alt="Logo1" />
    </div>
  </header>
  )
}

export default HeaderAtestation