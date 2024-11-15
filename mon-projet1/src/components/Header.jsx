
import React from 'react';

// import css
import './Header.css';
import './Logo.css'
import './SearchBar.css';
import './Nav.css';
// import '../App.css';

// import Logo from './Logo';
// import SearchBar from './SearchBar';
// import Nav from './Nav';

import NavNotice from './NavNotice';
import NavMessage from './NavMessage';
import NavAvatar from './NavAvatar';
import logo from "../images/logo.jpg";


function Header() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle('toggle-sidebar');
}
  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
      {/* {logo} */}
      <div className="d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-none d-lg-block">
       <img src={logo} alt="Logo" className="img"/>
         {/* <span className='d-none d-lg-block'>DREN ANALAMANGA</span> */}
        </a>
        <i 
        className='bi bi-list toggle-sidebar-btn'
        onClick={handleToggleSideBar}
        ></i>
    </div>
      {/* {search bar} */}
      <div className="search-bar">
        <form 
         className="search-form d-flex align-items-center"
         method="POST"
         action="#">
            <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search Keyword"
            />
            <button type="submit" title="search">
                <i className="bi bi-search"></i>
            </button>
         </form>
    </div>
    {/* Titre */}
    <h1>Dren Analamanga</h1>
      {/* {nav} */}
      <nav className='header-nav ms-auto'>
    <ul className="d-flex align-items-center">
        <NavNotice />
        <NavMessage />
        <NavAvatar />
    </ul>
   </nav>
    </header>
  )
}

export default Header