import React, { useContext, useEffect, useState } from 'react'
import SellerSideBar from './SellerSideBar';
import logo from '../../product.jpg';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { CurrencyContext } from '../../context/CurrencyContex';

const SellerShowCustomerOrder = () => {
    const {seller_id,customer_id} = useParams();
    const {getCurrency} = useContext(CurrencyContext);
    const [getCustomerOrder,setCustomerOrder] = useState([]);

    useEffect(() => {
        const getCustomerOrder = async () => {
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/seller/customer/order/${seller_id}/${customer_id}/`)
                if(res.status === 200){
                    setCustomerOrder(res.data.data)
                }else{
                    console.log("Error occure during fetching an api")
                }
            }catch(error){
                console.log("Check network connection",String(error))
            }
        }
        getCustomerOrder();
    },[seller_id,customer_id])

  return (
    <div className="container mt-5" style={{marginBottom:"12rem"}}>
        <div className="row">
            <div className="col-md-3">
                <SellerSideBar />
            </div>
            <div className="col-md-9">
                <div className="form-control">
                    <h2 style={{textAlign:"center"}}>Welcome,Seller</h2>
                    <hr />
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
                                {
                                    getCustomerOrder.map((products,index) => (
                                    <tr key={products.product.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <span style={{display:"flex"}}>
                                            <img src={`${process.env.REACT_APP_API_URL}/${products.product?.image}`} className='img-thumbnail' style={{width:"60px"}} alt="product1" />
                                            <p style={{marginLeft:"20px"}}>{products.product?.title}</p>
                                            </span>
                                        </td>
                                        <td>
                                            {
                                                getCurrency === 'inr' ? (
                                                    <p>₹ {products.product?.price}</p>
                                                ) : (
                                                    <p>$ {products.product?.usd_price}</p>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <span className="text-success">
                                            <i className='fa fa-check-circle'></i> Completed 
                                            </span>
                                        </td>
                                        <td>
                                            <div class="btn-group">
                                                <Link class="btn btn-primary dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Change Status
                                                </Link>
                                                <ul class="dropdown-menu">
                                                    <li><Link class="dropdown-item" to="#">Approved</Link></li>
                                                    <li><Link class="dropdown-item" to="#">Processing</Link></li>
                                                    <li><Link class="dropdown-item" to="#">Cancelled</Link></li>
                                                </ul>
                                            </div>
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
  )
};

export default SellerShowCustomerOrder;
