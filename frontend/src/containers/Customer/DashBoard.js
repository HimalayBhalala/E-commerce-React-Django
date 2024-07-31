import React from 'react'
import SideBar from './SideBar';

const DashBoard = () => {

  const totalOrder = localStorage.getItem('order-count')

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
                            <div style={{fontSize:"25px",color:'maroon'}}>{totalOrder}</div>
                      </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="card-title">
                        <h3>Total WishList</h3>
                      </div>
                        <div style={{fontSize:"25px",color:'maroon'}}>{4}</div>
                      </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="card-title">
                          <h3>Total Addresses</h3>
                      </div>
                        <div style={{fontSize:"25px",color:'maroon'}}>{1}</div>
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
