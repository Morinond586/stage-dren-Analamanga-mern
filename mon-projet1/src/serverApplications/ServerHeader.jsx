import React from 'react'
import '../Attestqtion/HeaderStyle.css'

import logo from "../images/logo.jpg";
import Rep from "../images/republique-madagascar.jpg";
import log from "../images/logoDREN8ANALAMANGA.jpg";
// import icon vient react-icon
// import 
// {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
// from 'react-icons/bs';

function ServerHeader({OpenSidebar}) {
  return (
  <header className="header">
          <div className="logo-left d-flex">
          <img src={log} alt="Logo" className='m-2'/>
          </div>
          <div>
          <div className="logo-right mt-1" style={{width: '99%', textAlign:'center'}}>
            <img src={Rep} alt="Logo1" />
          </div>
          <p className="title">
            Administrateur  <br /> 
          </p>
          <p style={{textAlign:'center'}}>de la DREN Analamanga</p>
          </div>
          <div className="logo-left d-flex">
          <img src={logo} alt="Logo" className='m-2'/>
          </div>
  </header>
  )
}

export default ServerHeader