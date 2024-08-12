import React, { useEffect, useState } from 'react'
import SellerSideBar from './SellerSideBar';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SellerCustomers = () => {
    const seller_id = localStorage.getItem('seller_id');
    const[getCustomer,setCustomer] = useState([])

    useEffect(() => {
        const getSellerCustomer = async () => {
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/seller/customers/${seller_id}/`)
                setCustomer(res.data.data.customers)
            }catch(error){
                console.log("Check Network connection",String(error))
            }
        }
        getSellerCustomer();
    },[seller_id])

    const customerRemoveFromList = () => {
        console.log("Customer is removed")
    }

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
                                        {
                                            getCustomer.map((customer,index) => (
                                                <tr key={customer.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{customer?.email}</td>
                                                    <td>{customer?.mobile}</td>
                                                    <td>
                                                        <Link className='btn btn-sm btn-primary' to={`/seller/order/${seller_id}/${customer.id}`} >Order</Link>
                                                        <Link className='btn btn-danger btn-sm ms-1' onClick={customerRemoveFromList}>Remove From List</Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
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