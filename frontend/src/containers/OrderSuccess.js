import React from 'react'
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div>
      <div className="container" style={{marginTop:"8rem",marginBottom:"8.9rem"}}>
        <div className="row">
          <div className="col-md-10 offset-1">
            <div className="card">
              <div className="card-body text-center">
                  <p><i className='fa text-success fa-check-circle fa-5x'></i></p>
                  <h3 className='text-success'>Thanks for the order</h3>
                  <hr />
                  <div>
                      <Link to="/" className='btn btn-primary btn-sm'>Go Back Home</Link>
                      <Link to="/dashboard" className='btn btn-secondary btn-sm ms-1'>Go To DashBoard</Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default OrderSuccess;
