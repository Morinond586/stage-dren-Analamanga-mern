import React from 'react'

const StepperContoller = () => {
  return (
    <div className="container d-flex justify-around mt-5 mb-5">
        {/* back button */}
           <button className="btn bg-white text-slate-400 uppercase py-2 px-4
           rounded-xl font-semibold cursor-pointer border-2 border-slate-300
           hover:bg-slate-700 hover:text-success transition duration-2 ease-in-out">
             Back
           </button>
        {/* Next button */} 
        <button className="btn bg-success text-green uppercase py-2 px-4
           rounded-xl font-semibold cursor-pointer hover:bg-slate-700 
           hover:text-white transition duration-2oo ease-in-out">
             Next
        </button>
    </div>
  )
}

export default StepperContoller