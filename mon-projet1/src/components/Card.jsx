import React from 'react';
import './card.css';

function Card() {
  return (
    <div className="col-xxl-4 col-md-4 d-flex dashbo">
    <div className="card info-card sales-card">
       <div className="card-body">
        <h5 className="card-title">
            <span>Sales</span>
        </h5>

        <div className="d-flex align-items-center">
           <div className="card-icon rounded-circle d-flex align-center justify-content-center">
            <i className='bi-bi-card'></i>
           </div>
           <div className="ps-3">
            <h6>6777</h6>
            <span 
            className="text-success small pt-1 fw-bold">
                26%
            </span>
           </div>
        </div>
       </div>
    </div>

    <div className="card info-card revenu-card">
       <div className="card-body">
        <h5 className="card-title">
            <span>Revenue</span>
        </h5>

        <div className="d-flex align-items-center">
           <div className="card-icon rounded-circle d-flex align-center justify-content-center">
            <i className="bi-bi-currency-dollar"></i>
           </div>
           <div className="ps-3">
            <h6>6777</h6>
            <span 
            className="text-success small pt-1 fw-bold">
                26%
            </span>
           </div>
        </div>
       </div>
    </div>

    
    <div className="card info-card customers-card">
       <div className="card-body">
        <h5 className="card-title">
            <span>Revenue</span>
        </h5>

        <div className="d-flex align-items-center">
           <div className="card-icon rounded-circle d-flex align-center justify-content-center">
            <i className="bi-bi-currency-dollar"></i>
           </div>
           <div className="ps-3">
            <h6>6777</h6>
            <span 
            className="text-success small pt-1 fw-bold">
                26%
            </span>
           </div>
        </div>
       </div>
    </div>
    </div>
  )
}

export default Card