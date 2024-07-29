import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import OrderRow from "./OrderRow";
import { Link } from "react-router-dom";
import { CurrencyContext } from "../../context/CurrencyContex";

const Orders = () => {
  const customer_id = JSON.parse(localStorage.getItem("customer_id"));
  const [orderItem, setOrderItem] = useState([]);
  const {currency} = useContext(CurrencyContext);
  const order_currency = localStorage.getItem('order-currency');

  useEffect(() => {
    if (customer_id) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/ecommerce/${customer_id}/orderitems/`
          );
          const data = await response.json();
          setOrderItem(data.data);
        } catch (error) {
          console.error("Error fetching order items:", error);
        }
      };

      fetchData();
    }
  }, [customer_id]);

  return (
    <>
    {console.log(currency,order_currency)}
    {
      (orderItem.length <= 0) ? (
        <div className="container mt-5" style={{ marginBottom: "12rem" }}>
          <div className="row">
            <div className="col-md-3">
              <SideBar />
            </div>
            <div className="col-md-9">
              <div className="text-center">
                <h1 className="text-center" style={{marginTop:"4.5rem"}}>Currently no active order has been present.</h1>
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

export default Orders;