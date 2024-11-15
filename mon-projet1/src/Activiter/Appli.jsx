// import {useState} from 'react';

// import './App.css';
// import Header from './Interface/Header';
// import SidBar from './Interface/Sidebar';
// import Index from './Contenu/Index';
import Index from './Index'
import BackToTop from '../Interface/BackToTop';
// import Footer from './Interface/Footer';

function Appli() {
  
    // const [openSidebarToggle, setOpenSidebarToggle] =  useState(false)
  
    // const OpenSidebar = () => {
    //    setOpenSidebarToggle(!openSidebarToggle)
    // }
  
    return (
      <div>
      {/* <Header OpenSidebar={OpenSidebar}/>
      <SidBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/> */}
      {/* <Index /> */}
      <Index />
    {/* <Footer /> */}
    <BackToTop />
    </div>
  )
}

export default Appli