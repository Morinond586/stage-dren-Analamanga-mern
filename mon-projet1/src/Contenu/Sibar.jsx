import React from 'react'
import '../Activiter/index.css'
import Header from '../components/Header';
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

    import Img from '../images/bbb.jpg';
    import Imge from '../images/boy1.jpg'
    import Imges from '../images/byby.jpg'
import { Link } from 'react-router-dom';
import Table from '../serverApplications/Table';

function Sibar() {
  return (
    <div className='container'>
            {/* <Header /> */}
    {/* <!-- Sidebar Section--> */}
    <aside>

        <div className="sidebar">
            <a href="#">
                <span className="material-icons-sharp ">
                <BsGrid1X2Fill className='icon'/> Service 
                </span>
                {/* <h3></h3> */}
            </a>
            <a href="#">
                <span className="material-icons-sharp ">
                <BsMenuButtonWideFill className='icon'/> Liste de rapports
                </span>
                {/*  */}
            </a>
            <a href="#">
                <span className="material-icons-sharp">
                <BsFillArchiveFill className='icon'/> Archives         
                </span>
                {/* <h3>History</h3> */}
            </a> 
            <Link to={'/Ajourapport'} >
                <span className="material-icons-sharp">
                <i className="bi bi-menu-button-wide"></i>  
                </span>
                {/* <h3>History</h3> */}Rapors
            </Link> 
            <a href="#" className="active">
                <span class="material-icons-sharp">
                <BsFillGrid3X3GapFill className='icon'/> Activité
                </span>
                {/* <h3>analystics</h3> */}
            </a>
            <a href="#">
                <span className="material-icons-sharp">
                <BsFillEnvelopeFill className='icon'/> Mail
                </span>
                {/* <h3>Tickets</h3> */}
                <span className="message-count">27</span>
            </a>
            <a href="#">
                <span className="material-icons-sharp">
                <BsPersonCircle className='icon'/> Profile
                </span>
                {/* <h3>Reports</h3> */}
            </a>
            <a href="#">
                <span className="material-icons-sharp">
                <BsFillGearFill className='icon'/> Paramettre
                </span>
                {/* <h3>Reports</h3> */}
            </a>
        
            <a href="#">
                <span className="material-icons-sharp">
                <BsPeopleFill className='icon'/> Admin
                </span>
                {/* <h3>New Login </h3> */}
            </a>
            <a href="#">
                <span className="material-icons-sharp">
                    {/* logout */}
                    <i className='bi bi-box-arrow-right'></i>
                </span>
                <h3>Logout</h3>
            </a>
        </div>
    </aside>
    {/* End of Sidebar Section */}
    </div>
  )
}

export default Sibar