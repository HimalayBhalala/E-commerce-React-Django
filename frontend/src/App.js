import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './storage';
import Layout from './hoc/Layout';
import Footer from './componenets/Footer';

import Home from './containers/Home';
import Categories from './containers/Categories';
import CategoryProducts from './containers/CategoryProducts';
import AllProduct from './containers/AllProduct';
import ProductDetail from './containers/ProductDetail';
import AboutUs from './containers/AboutUs';
import Help from './containers/Help';
import ContactUs from './containers/ContactUs';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import AddEmail from './containers/AddEmail';
import ForgetPassword from './containers/ForgetPassword';
import SearchProduct from './containers/Customer/SearchProduct';
import SortedOrderDate from './containers/Customer/SortedOrderDate';
import UpdateAddress from './containers/Customer/UpdateAddress';
import SelectRole from './containers/SelectRole';
import NotFound from './containers/NotFound';

// Customer Panel Imports
import DashBoard from './containers/Customer/DashBoard';
import Orders from './containers/Customer/Orders';
import Profile from './containers/Customer/Profile';
import ChangePassword from './containers/Customer/ChangePassword';
import Addresses from './containers/Customer/Addresses';
import AddAddress from './containers/Customer/AddAddress';
import WishList from './containers/Customer/WishList';
import Checkout from './containers/Customer/Checkout';
import OrderConfirm from './containers/Customer/OrderConfirm';

// Seller Panel Imports
import SellerDashBoard from './containers/Seller/SellerDashBoard';
import SellerProfile from './containers/Seller/SellerProfile';
import SellerProducts from './containers/Seller/SellerProducts';
import SellerOrders from './containers/Seller/SellerOrders';
import SellerCustomers from './containers/Seller/SellerCustomers';
import SellerAddProduct from './containers/Seller/SellerAddProduct';
import SellerChangePassword from './containers/Seller/SellerChangePassword';
import Report from './containers/Seller/Reports';
import TagProduct from './containers/TagProduct';

// Context Providers Imports
import { CartProvider } from './context/CardContext';
import { CurrencyProvider } from './context/CurrencyContex';
import { WishListProvider } from './context/WishListContext';
import AddCategory from './containers/Seller/AddCategory';

function App() {
  return (
    <Provider store={store}>
        <CurrencyProvider>
          <CartProvider>
            <WishListProvider>
              <Router>
                <Layout>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/register" element={<SignUp />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/add/email" element={<AddEmail />} />
                      <Route path="/products" element={<AllProduct />} />
                      <Route path="/forget/password" element={<ForgetPassword />} />
                      <Route path="/select/role" element={<SelectRole />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="/product/tag/:tag" element={<TagProduct />} />
                      <Route path="/product/:product_slug/:product_id" element={<ProductDetail />} />
                      <Route path="/category/:category_slug" element={<CategoryProducts />} />
                      
                      {/* Customer Panel */}
                      <Route path="/dashboard" element={<DashBoard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/change/password" element={<ChangePassword />} />
                      <Route path="/search" element={<SearchProduct />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/order/confirm" element={<OrderConfirm />} />
                      <Route path="/wishlist" element={<WishList />} />
                      <Route path="/addresses" element={<Addresses />} />
                      <Route path="/add/address" element={<AddAddress />} />
                      <Route path="/order/:date" element={<SortedOrderDate />} />
                      <Route path="/address/:address_id" element={<UpdateAddress />} />
                      
                      {/* Seller Panel */}
                      <Route path="/seller/dashboard" element={<SellerDashBoard />} />
                      <Route path="/seller/products" element={<SellerProducts />} />
                      <Route path="/seller/add/product" element={<SellerAddProduct />} />
                      <Route path="/seller/customer" element={<SellerCustomers />} />
                      <Route path="/seller/orders" element={<SellerOrders />} />
                      <Route path="/seller/profile" element={<SellerProfile />} />
                      <Route path="/seller/change/password" element={<SellerChangePassword />} />
                      <Route path="/seller/report" element={<Report />} />
                      <Route path="seller/add/category" element={<AddCategory />} />

                      <Route path="*" element={<NotFound />} />

                    </Routes>
                  </Layout>
                <Footer />
              </Router>
            </WishListProvider>
          </CartProvider>
        </CurrencyProvider>
    </Provider>
  );
}

export default App;
