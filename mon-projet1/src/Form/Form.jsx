import React from 'react'
import Stepper from './Stepper'
import StepperContoller from './StepperContoller'
import './form.css'
function Form() {
  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-xl pb-2 bg-white">
      {/* Stepper */}
      <div className="container horizontal mt-5">
       <Stepper />
      </div>
      {/* Navigation controls */}
      <StepperContoller />
    </div>
  )
}

export default Form