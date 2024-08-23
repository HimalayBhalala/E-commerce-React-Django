import React from 'react';
import SellerSideBar from './SellerSideBar';
import { Link } from 'react-router-dom';

const downloadReport = (reportType) => {
  const url = `http://localhost:8000/ecommerce/reports/${reportType}/`;
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}_report.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch(error => console.error('Error downloading report:', error));
};

const SellerDashBoard = () => {
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <SellerSideBar />
          </div>
          <div className="col-md-9" style={{ marginBottom: "40rem" }}>
            <div className="row" style={{ color: "black" }}>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="card-title">
                      <h3>Daily Reports</h3>
                    </div>
                    <button
                      style={{ fontSize: "18px" }}
                      className='btn btn-info btn-sm'
                      onClick={() => downloadReport('daily')}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="card-title">
                      <h3>Monthly Reports</h3>
                    </div>
                    <button
                      style={{ fontSize: "18px" }}
                      className='btn btn-info btn-sm'
                      onClick={() => downloadReport('monthly')}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="card-title">
                      <h3>Yearly Reports</h3>
                    </div>
                    <button
                      style={{ fontSize: "18px" }}
                      className='btn btn-info btn-sm'
                      onClick={() => downloadReport('yearly')}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashBoard;
