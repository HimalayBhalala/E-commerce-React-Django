import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import OrderRow from "./OrderRow";
import { Link, useParams } from "react-router-dom";
import { CurrencyContext } from "../../context/CurrencyContex";

const OrderDate = () => {
  const customer_id = JSON.parse(localStorage.getItem("customer_id"));
  const [orderItem, setOrderItem] = useState([]);
  const {currency} = useContext(CurrencyContext);
  const order_currency = localStorage.getItem('order-currency');

  const {date} = useParams();

  useEffect(() => {
    if (customer_id) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/ecommerce/${customer_id}/orderitems/${date}/`
          );
          const res = await response.json();
          setOrderItem(res.data);
        } catch (error) {
          console.error("Error fetching order items:", error);
        }
      };

      fetchData();
    }
  }, [customer_id]);

  
  return (
    <>
    <div className="mt-2" style={{alignItems:"end",float:"right",marginRight:"1rem"}}>
      <Link className="btn btn-primary" style={{backgroundColor:"silver",color:"darkblue"}} to="/orders" >Back to Order</Link>
    </div>
    {
      (orderItem.length <= 0) ? (
        <div className="container mt-5" style={{ marginBottom: "12rem" }}>
          <div className="row">
            <div className="col-md-3">
              <SideBar />
            </div>
            <div className="col-md-9">
              <div className="text-center">
                <h1 className="text-center" style={{marginTop:"4.5rem"}}>No order found</h1>
                <Link className="btn btn-primary text-center mt-5" to='/'>Go to Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        (order_currency !== currency) ? (
          <div className="container mt-5" style={{ marginBottom: "12rem" }}>
          <div className="row">
            <div className="col-md-3">
              <SideBar />
            </div>
            <div className="col-md-9">
              <div className="text-center">
                <h1 className="text-center" style={{marginTop:"4.5rem"}}>Your order has been not found in this currency.</h1>
                <Link className="btn btn-primary text-center mt-5" to='/'>Go to Shopping</Link>
              </div>
            </div>
          </div>
        </div>
        ) : (
        <div className="container mt-5" style={{ marginBottom: "12rem" }}>
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
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItem.map((products, index) => (
                      <OrderRow products={products} key={index} index={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )
    )
    }
    </>
  );
};

export default OrderDate;