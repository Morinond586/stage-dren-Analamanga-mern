import React from 'react'
import profilImg from '../assets/img/M.jpg';

function NavAvatar() {
  return (
    <li className="nav-item dropdown pe-3">
       <a 
       className="nav-link nav-profile d-flex align-items-center pe-0"
       data-bs-toggle="dropdown"
       >
        <img src={profilImg} alt="profile" className='rounded-circle' />
        <span className='d-none d-md-block dropdown-toggle ps-2'>M Vital</span>
       </a>

       <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
        <li className='dropdown-header'>
             <h6>M Vital</h6>
             <span>Web Developer</span>
        </li>

        <li>
          <hr className='dropdown-diviser' />
        </li>

        <li>
          <a className="dropdown-item d-flex align-items-center">
            <i className='bi bi-person'></i>
            <span>My Profile</span>
          </a>
        </li>
        
        <li>
          <hr className='dropdown-diviser' />
        </li>

        <li>
          <a className="dropdown-item d-flex align-items-center">
            <i className='bi bi-gear'></i>
            <span>Account Setting</span>
          </a>
        </li>

        <li>
          <hr className='dropdown-diviser' />
        </li>

        <li>
          <a className="dropdown-item d-flex align-items-center">
            <i className='bi bi-question-circle'></i>
            <span>Need help</span>
          </a>
        </li>

        <li>
          <hr className='dropdown-diviser' />
        </li>

        <li>
          <a className="dropdown-item d-flex align-items-center">
            <i className='bi bi-box-arrow-right'></i>
            <span>Sign Out</span>
          </a>
        </li>

       </ul>
    </li>
  )
}

export default NavAvatar