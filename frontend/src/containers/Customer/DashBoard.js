import React from 'react'
import SideBar from './SideBar';
import { Link } from 'react-router-dom';

const DashBoard = () => {
  return (
    <div>
      <div className="container mt-5" style={{marginBottom:"12rem"}}>
        <div className="row">
            <div className="col-md-3">
              <SideBar/>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                      <div className="card-body text-center">
                          <div className="card-title">
                            <h3>Total Orders</h3>
                          </div>
                            <Link style={{fontSize:"25px"}}>123</Link>
                      </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="card-title">
                        <h3>Total WishList</h3>
                      </div>
                        <Link style={{fontSize:"25px"}}>44</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="card-title">
                          <h3>Total Addresses</h3>
                      </div>
                        <Link style={{fontSize:"25px"}}>3</Link>
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

export default DashBoard;
