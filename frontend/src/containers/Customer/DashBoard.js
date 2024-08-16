import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ThemeContext } from '../../context/ThemeContext';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const DashBoard = () => {
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalwishlist, setTotalWishList] = useState(0);
  const {themeMode} = useContext(ThemeContext);
  const [orderData, setOrderData] = useState({ labels: [], datasets: [] });
  const customer_id = localStorage.getItem('customer_id');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/customer-product-count/${customer_id}`)
      .then((response) => {
        setTotalOrder(response.data.data.order_lists.length);
        setTotalWishList(response.data.data.customer_wishlist.length);
      })
      .catch((error) => {
        console.log("Error during fetching an API", String(error));
      });

    axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/total-order/${customer_id}`)
      .then((response) => {
        const orders = response.data.orders;
        const labels = [];
        const data = [];
        orders.forEach(order => {
          const orderDate = new Date(order.order_time).toLocaleDateString();
          const index = labels.indexOf(orderDate);
          
          if (index === -1) {
            labels.push(orderDate);
            data.push(1);
          } else {
            data[index] += 1;
          }
        });

        setOrderData({
          labels: labels,
          datasets: [
            {
              label: 'Orders',
              data: data,
              fill: false,
              borderColor: 'rgba(15,150,255,10)',
              tension: 0.1
            }
          ]
        });
      })
      .catch((error) => {
        console.log("Error during fetching order data", String(error));
      });
  }, [customer_id]);

  return (
    <div>
      {console.log("Order Data",orderData)}
      <div className="container mt-5" style={{ marginBottom: "12rem" }}>
        <div className="row" style={{color : themeMode === "dark" ? "black" : "black"}}>
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="card-title">
                      <h3>Total Orders</h3>
                    </div>
                    <div style={{ fontSize: "25px", color: 'maroon' }}>{totalOrder}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="card-title">
                      <h3>Total WishList</h3>
                    </div>
                    <div style={{ fontSize: "25px", color: 'maroon' }}>{totalwishlist}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="card-title">
                      <h3>Total Addresses</h3>
                    </div>
                    <div style={{ fontSize: "25px", color: 'maroon' }}>{1}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Orders Over Time</h4>
                    <Line
                      data={orderData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          x: {
                            title: {
                              display: true,
                              text: 'Date'
                            }
                          },
                          y: {
                            title: {
                              display: true,
                              text: 'Number of Orders'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                    <p className='text-center mt-3'>Chart of total order based on date (format = month-date-year)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
