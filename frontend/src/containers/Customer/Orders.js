import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SideBar from "./SideBar";
import OrderRow from "./OrderRow";
import { ThemeContext } from "../../context/ThemeContext";

const Orders = () => {
  const [orderItem, setOrderItem] = useState([]);
  const [formData, setFormData] = useState({});
  const { themeMode } = useContext(ThemeContext);

  const customerId = JSON.parse(localStorage.getItem("customer_id"));
  const { date } = formData;

  useEffect(() => {
    if (customerId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/ecommerce/${customerId}/orderitems/`
          );
          setOrderItem(response.data.data || []);
        } catch (error) {
          console.error("Error fetching order items:", error);
        }
      };

      fetchData();
    }
  }, [customerId]);
  
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="mt-2" style={{ alignItems: "end", float: "right", marginRight: "1rem" }}>
        <input
          type="date"
          name="date"
          value={date || ""}
          onChange={onChange}
          style={{ height: "2.28rem" }}
        />
        <Link
          className="btn"
          style={{ backgroundColor: "silver", color: "darkblue" }}
          to={`/order/${date}`}
        >
          Get Order
        </Link>
      </div>
      {orderItem.length === 0 ? (
        <div className="container mt-5" style={{ marginBottom: "2rem" }}>
          <div className="row">
            <div className="col-md-3">
              <SideBar />
            </div>
            <div className="col-md-9">
              <div className="text-center">
                <h1 className="text-center" style={{ marginTop: "4.5rem" }}>
                  Currently, no active orders are present.
                </h1>
                <Link className="btn btn-primary text-center mt-5" to="/">
                  Go to Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-5" style={{ marginBottom: "1rem" }}>
          <div className="row">
            <div className="col-md-3">
              <SideBar />
            </div>
            <div className="col-md-9" style={{marginBottom:"10rem"}}>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr style={{ color: themeMode === "dark" ? "white" : "black" }}>
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
      )}
    </>
  );
};

export default Orders;
