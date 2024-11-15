import React from 'react';
import Img from '../assets/img/M.jpg';

function NavMessage() {
  return (
   <li className="nav-item dropdown">
    <a className="nav-link nav-icon" data-bs-toggle="dropdown">
      <i className="bi bi-chat-left-text"></i>
      <span className='badge bg-success badge-number'>3</span>
    </a>

    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
      <li className="dropdown-header">
        You have 3 new messages
        <a href="#">
          <span className="badge rounded-pill bg-primary p-2 ms-2">
            View all
          </span>
        </a>
      </li>

      <li>
        <hr className="dropdown-diviser" />
      </li>

      <li className="message-item">
        <a href="#">
          <img 
          src={Img}
          alt=""
          className="rounded-circle"
          />
          <div>
            <h4>Morinond Vital</h4>
            <p>KILIKILINGOLINGO
              hfgduyyurgyruytryttrytthryutryu...
            </p>
            <p>6 hrs. ago</p>
          </div>
        </a>
      </li>

      <li>
        <hr className="dropdown-diviser" />
      </li>

      <li className="message-item">
        <a href="">
          <img 
          src={Img}
          alt=""
          className="rounded-circle"
          />
          <div>
            <h4>Morinond Vital</h4>
            <p>KILIKILINGOLINGO
              hfgduyyurgyruytryttrytthryutryu...
            </p>
            <p>6 hrs. ago</p>
          </div>
        </a>
      </li>

    </ul>
   </li>
  )
}

export default NavMessage