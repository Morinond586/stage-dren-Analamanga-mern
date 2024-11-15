import React from 'react'
import SiebarAttestation from './SiebarAttestation'

import HomeAttestation from './HomeAttestation'
//css 
import './Attestyle.css'
// import other file
import BackTotop from '../Interface/BackToTop'
import HeaderAtestation from './HeaderAtestation'
import AttestationFooter from './AttestatiionFooter'


function Attestation() {
  return (
    <div>
      <HeaderAtestation />
      <SiebarAttestation />
      <div className="main--content">
      <HomeAttestation />
      </div>
      <AttestationFooter />
      <BackTotop />
    </div>
  )
}

export default Attestation