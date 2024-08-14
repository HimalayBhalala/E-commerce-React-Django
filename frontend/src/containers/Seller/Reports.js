import React from 'react'
import SellerSideBar from './SellerSideBar';
import { Link } from 'react-router-dom';

const SellerDashBoard = () => {
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
            <div className="col-md-3">
              <SellerSideBar/>
            </div>
            <div className="col-md-9" style={{marginBottom:"40rem"}}>
              <div className="row" style={{color:"black"}}>
                <div className="col-md-4">
                  <div className="card">
                      <div className="card-body text-center">
                          <div className="card-title">
                            <h3>Daily Reports</h3>
                          </div>
                            <Link style={{fontSize:"18px"}} className='btn btn-info btn-sm'>View</Link>
                      </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="card-title">
                        <h3>Monthly Reports</h3>
                      </div>
                          <Link style={{fontSize:"18px"}} className='btn btn-info btn-sm'>View</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="card-title">
                          <h3>Yearly Reports</h3>
                      </div>
                        <Link style={{fontSize:"18px"}} className='btn btn-info btn-sm'>View</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
};

export default SellerDashBoard;
