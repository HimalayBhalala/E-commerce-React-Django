import React, { useEffect, useState } from 'react';
import SellerSideBar from './SellerSideBar';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend,BarElement, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement,ArcElement, CategoryScale, LinearScale);

const SellerDashBoard = () => {
  const seller_id = localStorage.getItem('seller_id');
  const [productData, setProductData] = useState({ labels: [], datasets: [] });
  const [orderData, setOrderData] = useState({ labels: [], datasets: [] });
  const [customerData, setCustomerData] = useState({ labels: [], datasets: [] });
  const [totalCountProduct, setTotalCountProduct] = useState(0);
  const [totalCountOrder, setTotalCountOrder] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [productPieData, setProductPieData] = useState({ labels: [], datasets: [] });
  const [orderPieData, setOrderPieData] = useState({ labels: [], datasets: [] });
  const [customerPieData, setCustomerPieData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/seller/products/${seller_id}`);
        const products = productResponse.data.data.seller.products;
        setTotalCountProduct(products.length);

        const productLabels = [];
        const productCounts = [];
        const productCategories = [];
        const productCategoryCounts = [];

        products.forEach((product) => {
          const productDate = new Date(product?.product_stemp).toLocaleDateString();
          if (!productLabels.includes(productDate)) {
            productLabels.push(productDate);
            productCounts.push(1);
          } else {
            productCounts[productLabels.indexOf(productDate)] += 1;
          }

          if (!productCategories.includes(product.category.title)) {
            productCategories.push(product.category.title);
            productCategoryCounts.push(1);
          } else {
            productCategoryCounts[productCategories.indexOf(product.category.title)] += 1;
          }
        });

        setProductData({
          labels: productLabels,
          datasets: [{
            label: "Products Over Time",
            data: productCounts,
            fill: false,
            borderColor: 'rgba(15,150,255,1)',
            tension: 0.1,
          }],
        });

        setProductPieData({
          labels: productCategories,
          datasets: [{
            label: 'Product Distribution',
            data: productCategoryCounts,
            backgroundColor: ['rgb(26, 160, 3)', 'rgb(12, 150, 255)', 'rgb(211, 165, 0)','rgb(12, 100, 255)','rgb(76, 60, 30)', 'rgb(120, 15, 25)', 'rgb(255, 16, 40)','rgb(120, 10, 205)'],
            borderColor: ['rgba(255, 99, 100, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)','rgb(12, 100, 255)','rgb(76, 60, 30)', 'rgb(120, 15, 25)', 'rgb(255, 16, 40)','rgb(120, 10, 205)'],
            borderWidth: 1,
          }],
        });

        const orderResponse = await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/seller/orders/${seller_id}`);
        const orders = orderResponse.data.data.seller;
        setTotalCountOrder(orders.length);

        const orderLabels = [];
        const orderCounts = [];
        const orderCategories = [];
        const orderCategoryCounts = [];

        orders.forEach((orders) => {
          const orderDate = new Date(orders.order?.order_time).toLocaleDateString();
          if (!orderLabels.includes(orderDate)) {
            orderLabels.push(orderDate);
            orderCounts.push(1);
          } else {
            orderCounts[orderLabels.indexOf(orderDate)] += 1;
          }

          if (!orderCategories.includes(orders.product.category?.title)) {
            orderCategories.push(orders.product.category?.title);
            orderCategoryCounts.push(1);
          } else {
            orderCategoryCounts[orderCategories.indexOf(orders.product.category?.title)] += 1;
          }
        });

        setOrderData({
          labels: orderLabels,
          datasets: [{
            label: "Orders Over Time",
            data: orderCounts,
            fill: false,
            borderColor: 'rgb(255, 106, 20)',
            tension: 0.1,
          }],
        });

        setOrderPieData({
          labels: orderCategories,
          datasets: [{
            label: 'Order Distribution',
            data: orderCategoryCounts,
            backgroundColor: ['rgb(255, 106, 20)','rgb(3, 65, 109)', 'rgb(60, 120, 109)','rgb(205, 16, 25)','rgb(30, 60, 19)', 'rgb(70, 127, 199)','rgb(18, 85, 19)', 'rgb(68, 126, 139)'],
            borderColor: ['rgb(255, 106, 20)', 'rgb(3, 65, 109)', 'rgb(60, 120, 109)','rgb(205, 16, 25)', 'rgb(03, 60, 19)', 'rgb(70, 127, 199)','rgb(18, 85, 19)', 'rgb(68, 126, 139)'],
            borderWidth: 1,
          }]
       });

        const customerResponse = await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/seller/customers/${seller_id}/`);
        const customers = customerResponse.data.data.customers;
        const products_data = customerResponse.data.data.products;

        setTotalCustomer(customers.length);
        const customerLabels = [];
        const customerCounts = [];
        const customerCategories = [];
        const customerCategoryCounts = [];
        
        customers.forEach((customer) => {
          const customerDate = new Date(customer?.date_joined).toLocaleDateString();
          if (!customerLabels.includes(customerDate)) {
            customerLabels.push(customerDate);
            customerCounts.push(1);
          } else {
            customerCounts[customerLabels.indexOf(customerDate)] += 1;
          }
        });

        products_data.forEach((product) => {
        if (!customerCategories.includes(product?.product_title)) {
            customerCategories.push(product?.product_title);
            customerCategoryCounts.push(1);
          } else {
            customerCategoryCounts[customerCategories.indexOf(product?.product_title)] += 1;
          }
        });

        setCustomerData({
          labels: customerLabels,
          datasets: [{
            label: "Customers Over Time",
            data: customerCounts,
            fill: false,
            borderColor: 'rgb(200, 103, 20)',
            tension: 0.1,
          }],
        });

        setCustomerPieData({
          labels: customerCategories,
          datasets: [{
            label: 'Customer Distribution',
            data: customerCategoryCounts,
            backgroundColor: ['rgb(200, 103, 20)','rgb(30, 69, 101)', 'rgb(69, 190, 199)','rgb(255, 156, 255)','rgb(56, 70, 59)', 'rgb(79, 147, 159)','rgb(98, 115, 129)', 'rgb(98, 106, 119)'],
            borderColor: ['rgb(200, 103, 20)', 'rgb(30, 69, 101)', 'rgb(69, 190, 199)','rgb(255, 156, 255)', 'rgb(56, 70, 59)', 'rgb(79, 147, 159)','rgb(98, 115, 129)', 'rgb(98, 106, 119)'],
            borderWidth: 1,
          }],
        });

      } catch (error) {
        console.log("Error during fetching an api", String(error));
      }
    };

    fetchData();
  }, [seller_id]);
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <SellerSideBar />
          </div>
          <div className="col-md-9">
            <div className="row" style={{color:"black"}}>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="card-title">
                      <h3>Total Products</h3>
                    </div>
                    <div style={{ fontSize: "25px", color: 'maroon' }}>
                      {totalCountProduct}
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
                      {totalCountOrder - 1}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="card-title">
                      <h3>Total Customers</h3>
                    </div>
                    <div style={{ fontSize: "25px", color: 'maroon' }}>
                      {totalCustomer}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body" style={{height:'30.9rem'}}>
                      <h4 className="card-title">Products Over Time</h4>
                      <Line
                        data={productData}
                        height="auto"
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
                                text: 'Date',
                              },
                            },
                            y: {
                              title: {
                                display: true,
                                text: 'Number of Products',
                              },
                            },
                          },
                        }}
                      />
                    </div>
                    <p className='text-center mt-3'>Chart of total product based on date (format = month-date-year)</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Product Distribution</h4>
                      <Pie
                        data={productPieData}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            tooltip: {
                              callbacks: {
                                label: function (tooltipItem) {
                                  return tooltipItem.label + ': ' + tooltipItem.raw;
                                },
                              },
                            },
                          },
                        }}
                      />
                    </div>
                    <p className='text-center mt-3'>Pie chart of product distribution by category</p>
                  </div>
                </div>
              </div>
              <br />
              <hr />
              <div className="row mt-2">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body" style={{height:'30.9rem'}}>
                      <h4 className="card-title">Order Over Time</h4>
                      <Line
                        data={orderData}
                        height="auto"
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
                                text: 'Date',
                              },
                            },
                            y: {
                              title: {
                                display: true,
                                text: 'Number of Orders',
                              },
                            },
                          },
                        }}
                      />
                    </div>
                    <p className='text-center mt-3'>Chart of total order based on date (format = month-date-year)</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Order Distribution</h4>
                      <Pie
                        data={orderPieData}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            tooltip: {
                              callbacks: {
                                label: function (tooltipItem) {
                                  return tooltipItem.label + ': ' + tooltipItem.raw;
                                },
                              },
                            },
                          },
                        }}
                      />
                    </div>
                    <p className='text-center mt-3'>Pie chart of Order distribution by product</p>
                  </div>
                </div>
              </div>
              <br />
              <hr />
              <div className="row mt-2" style={{marginBottom:"3rem"}}>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body" style={{height:'30.9rem'}}>
                      <h4 className="card-title">Customers Over Time</h4>
                      <Line
                        data={customerData}
                        height="auto"
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
                                text: 'Date',
                              },
                            },
                            y: {
                              title: {
                                display: true,
                                text: 'Number of Customers',
                              },
                            },
                          },
                        }}
                      />
                    </div>
                    <p className='text-center mt-3'>Chart of total customer based on date (format = month-date-year)</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Customer Product selection</h4>
                      <Pie
                        data={customerPieData}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            tooltip: {
                              callbacks: {
                                label: function (tooltipItem) {
                                  return tooltipItem.label + ': ' + tooltipItem.raw;
                                },
                              },
                            },
                          },
                        }}
                      />
                    </div>
                    <p className='text-center mt-3'>Pie chart of customer favorite product by category</p>
                  </div>
                </div>
              </div>
              <br />
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashBoard;
