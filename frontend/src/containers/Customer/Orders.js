import React from 'react'
import SideBar from './SideBar';
import logo from '../../product.jpg';

const Orders = () => {
  return (
    <div className="container mt-5" style={{marginBottom:"12rem"}}>
        <div className="row">
            <div className="col-md-3">
                <SideBar />
            </div>
            <div className="col-md-9">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>  
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <span style={{display:"flex"}}>
                                    <img src={logo} className='img-thumbnail' style={{width:"60px"}} alt="product1" />
                                    <p style={{marginLeft:"20px"}}>Python</p>
                                    </span>
                                </td>
                                <td>
                                    <p>Rs.500</p>
                                </td>
                                <td>
                                    <span className="text-success">
                                       <i className='fa fa-check-circle'></i> Completed 
                                    </span>
                                </td>
                                <td>
                                    <button className='btn btn-primary btn-sm'>Download</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <span style={{display:"flex"}}>
                                        <img src={logo} className='img-thumbnail' style={{width:"60px"}} alt="product1" />
                                        <p className='mt-2' style={{marginLeft:"20px"}}>Java</p>
                                    </span>
                                </td>
                                <td>
                                    <p>Rs.500</p>
                                </td>
                                <td>
                                    <span className="text-muted">
                                        <i className="fa-solid fa-spinner"></i> Processing
                                    </span>
                                </td>
                                <td>
                                    <button className='btn btn-primary btn-sm'>Download</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>
                                    <span style={{display:"flex"}} >
                                        <img src={logo} className='img-thumbnail' style={{width:"60px"}} alt="product1" />
                                        <p className='mt-2' style={{marginLeft:"20px"}}>C#</p>
                                    </span>
                                </td>
                                <td>
                                    <p>Rs.500</p>
                                </td>
                                <td>
                                    <span className='text-danger'>
                                        <i className="fa fa-times-circle"></i> Cancelled
                                    </span>
                                </td>
                                <td>
                                    <button className='btn btn-primary btn-sm'>Download</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Orders;
