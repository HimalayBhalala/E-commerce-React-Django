import React from 'react'
import SideBar from './SideBar';
import logo from '../../product.jpg';

const WishList = () => {
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
                                <th>Action</th>
                            </tr>
                        </thead>  
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <td>
                                        <img src={logo} className='img-thumbnail' style={{width:"60px"}} alt="product1" />
                                    </td>
                                    <td>
                                        <p className='mt-2' style={{marginLeft:"20px"}}>Python</p>
                                    </td>
                                </td>
                                <td>
                                    <p>Rs.500</p>
                                </td>
                                <td>
                                    <button className='btn btn-danger btn-sm'>Remove</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <td>
                                        <img src={logo} className='img-thumbnail' style={{width:"60px"}} alt="product1" />
                                    </td>
                                    <td>
                                        <p className='mt-2' style={{marginLeft:"20px"}}>Java</p>
                                    </td>
                                </td>
                                <td>
                                    <p>Rs.500</p>
                                </td>
                                <td>
                                    <button className='btn btn-danger btn-sm'>Remove</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>
                                    <td>
                                        <img src={logo} className='img-thumbnail' style={{width:"60px"}} alt="product1" />
                                    </td>
                                    <td>
                                        <p className='mt-2' style={{marginLeft:"20px"}}>C#</p>
                                    </td>
                                </td>
                                <td>
                                    <p>Rs.500</p>
                                </td>
                                <td>
                                    <button className='btn btn-danger btn-sm'>Remove</button>
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

export default WishList;
