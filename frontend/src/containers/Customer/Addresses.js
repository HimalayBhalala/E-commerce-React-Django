import React from 'react'
import SideBar from './SideBar';
import { Link } from 'react-router-dom';

const Addresses = () => {
  return (
    <div className="container mt-5" style={{marginBottom:"8.7rem"}}>
        <div className="row">
            <div className="col-md-3">
                <SideBar />
            </div>
            <div className="col-md-9">
                <h1>Welcome, xyz</h1>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <Link to="/add/address" className='btn mb-3' style={{float:"right",backgroundColor:'#52462f',color:'lightyellow'}}><i className='fa fa-plus-circle'></i> Add Address</Link>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div className="card">
                            <div className="card-body" style={{width:"350px",height:"120px"}}>
                                <i className='fa fa-check-circle text-success fa-1x' style={{marginBottom:"11px"}}></i>
                                <div className="card-title">
                                    <p className='text-muted'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, quaerat!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body" style={{width:"350px",height:"120px"}}>
                                <span className='badge bg-secondary mb-2'>Mark Default</span>
                                <div className="card-title">
                                    <p className='text-muted'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, quaerat!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body" style={{width:"350px",height:"120px"}}>
                                <span className='badge bg-secondary mb-2'>Mark Default</span>
                                <div className="card-title">
                                    <p className='text-muted'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, quaerat!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body" style={{width:"350px",height:"120px"}}>
                                <span className='badge bg-secondary mb-2'>Mark Default</span>
                                <div className="card-title">
                                    <p className='text-muted'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, quaerat!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body" style={{width:"350px",height:"120px"}}>
                                <span className='badge bg-secondary mb-2'>Mark Default</span>
                                <div className="card-title">
                                    <p className='text-muted'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, quaerat!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body" style={{width:"350px",height:"120px"}}>
                                <span className='badge bg-secondary mb-2'>Mark Default</span>
                                <div className="card-title">
                                    <p className='text-muted'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, quaerat!</p>
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

export default Addresses;
