import React from 'react'
// import Index from './Contenu/Index';
// import Appli from './Appli';

import Main from './Main';
// import Footer from './Interface/Footer';
import BackToTop from '../Interface/BackToTop';
import SidbarServer from './SidbarServer';
import AttestationFooter from '../Attestqtion/AttestatiionFooter';
import ServerHeader from './ServerHeader';
// import AttestationFooter from './Attestqtion/AttestatiionFooter';

function Pages() {
  return (
    <div>
    {/* <Index /> */}
   <ServerHeader />
     <SidbarServer />
     <div style={{marginTop: '-50%'}}>
     <Main /> 
    </div>
     {/* <Appli /> */}
     <BackToTop />
     <AttestationFooter />
     {/* <AttestationFooter /> */}
     {/* <Footer /> */}
   {/* <Login /> */}
    </div>
  )
}

export default Pages