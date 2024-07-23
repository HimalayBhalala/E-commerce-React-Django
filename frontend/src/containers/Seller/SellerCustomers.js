import React from 'react'
import SellerSideBar from './SellerSideBar';
import { Link } from 'react-router-dom';

const SellerCustomers = () => {
  return (
    <div>
        <div className="container mt-5" style={{marginBottom:"12rem"}}>
            <div className="row">
                <div className="col-md-3">
                    <SellerSideBar />
                </div>
                <div className="col-md-9"> 
                    <div className="form-control">           
                        <h2 className='text-center'>Welcome,Seller</h2>
                        <hr />
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>mayank@gmail.com</td>
                                        <td>4648464857</td>
                                        <td>
                                            <Link className='btn btn-sm btn-primary'>Order</Link>
                                            <Link className='btn btn-danger btn-sm ms-1'>Remove From List</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>admin@gmail.com</td>
                                        <td>7546647564</td>
                                        <td>
                                            <Link className='btn btn-sm btn-primary'>Order</Link>
                                            <Link className='btn btn-danger btn-sm ms-1'>Remove From List</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default SellerCustomers;