import React, { useEffect, useState } from 'react'
import SellerSideBar from './SellerSideBar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SellerDashBoard = () => {

  const seller_id = localStorage.getItem('seller_id');
  const [getTotalCountProduct,setTotalCountProduct] = useState(0);
  const [getTotalCountOrder,setTotalCountOrder] = useState(0);
  const [getTotalCustomer,setTotalCustomer] = useState(0);

  useEffect(() => {  
    const getTotalProduct = async () => {
      try{
        await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/seller/products/${seller_id}`)
          .then((response) => {
            setTotalCountProduct(response.data.data.seller.products.length)
          })
      }catch(error){
        console.log("Error during fetching an api",String(error))
      }
    }

    const getTotalOrder = async () => {
      try{
        await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/seller/orders/${seller_id}`)
          .then((response) => {
            setTotalCountOrder(response.data.data.seller.length)
          })
      }catch(error){
        console.log("Error during fetching an api",String(error))
      }
    } 

    const getTotalSellerCustomer = async () => {
      try{
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/seller/customers/${seller_id}/`)
          setTotalCustomer(res.data.data.customers.length)
      }catch(error){
          console.log("Check Network connection",String(error))
      }
    }
    getTotalOrder();
    getTotalProduct();
    getTotalSellerCustomer();
  },[seller_id])

  return (
    <div>
      <div className="container mt-5" style={{marginBottom:"12rem"}}>
        <div className="row">
            <div className="col-md-3">
              <SellerSideBar/>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="card-title">
                            <h3>Total Products</h3>
                      </div>
                      <div style={{ fontSize: "25px", color: 'maroon' }}>
                        {getTotalCountProduct}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="card-title">
                        <h3>Total Orders</h3>
                      </div>
                      <div style={{ fontSize: "25px", color: 'maroon' }}>
                        {getTotalCountOrder}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="card-title">
                          <h3>Total Customer</h3>
                      </div>
                      <div style={{ fontSize: "25px", color: 'maroon' }}>
                        {getTotalCustomer}
                      </div>
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

export default SellerDashBoard;
