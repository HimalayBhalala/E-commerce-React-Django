import React from 'react'
import SellerSideBar from './SellerSideBar';
import { Link } from 'react-router-dom';

const SellerProducts = () => {
  return (
    <div>
        <div className="container mt-5" style={{marginBottom:"12rem"}}>
            <div className="row">
                <div className="col-md-3">
                    <SellerSideBar/>
                </div>
                <div className="col-md-9">
                    <div className='form-control'>
                        <span className='btn btn-success float-end'>
                            <Link to='/seller/add/product' className='text-white' style={{textDecorationLine:"blink"}}><i className='fa fa-plus-circle'></i> Add More Product</Link>
                        </span>
                        <hr className='mt-5'/>
                        <div className="table-responsive">
                            <table className="table table-bordered mt-2">
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
                                        <td>Success</td>
                                        <td>Rs.500</td>
                                        <td>Published</td>
                                        <td>
                                            <span>
                                                <Link className="btn btn-info">View</Link>
                                                <Link className='btn btn-primary ms-1'>Edit</Link>
                                                <Link className='btn btn-danger ms-1'>Delete</Link>
                                            </span>
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

export default SellerProducts;
