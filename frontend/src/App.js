import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux' 
import store from './storage';
import Layout from './hoc/Layout';
import Home from './containers/Home';
import Categories from './containers/Categories';
import Footer from './componenets/Footer';
import CategoryProducts from './containers/CategoryProducts';
import AllProduct from './containers/AllProduct';
import ProductDetail from './containers/ProductDetail';
import OrderSuccess from './containers/OrderSuccess';
import OrderFailure from './containers/OrderFailure';
import AboutUs from './containers/AboutUs';
import Help from './containers/Help';
import ContactUs from './containers/ContactUs';
import SignUp from './containers/Customer/SignUp';
import Login from './containers/Customer/Login';
import DashBoard from './containers/Customer/DashBoard';
import Orders from './containers/Customer/Orders';
import Profile from './containers/Customer/Profile';
import ChangePassword from './containers/Customer/ChangePassword';
import Addresses from './containers/Customer/Addresses';
import AddAddress from './containers/Customer/AddAddress';
import WishList from './containers/Customer/WishList';
import Checkout from './containers/Customer/Checkout';
import SellerLogin from './containers/Seller/SellerLogin';
import SellerSignUp from './containers/Seller/SellerSignUp';
import SellerDashBoard from './containers/Seller/SellerDashBoard';
import SellerProfile from './containers/Seller/SellerProfile';
import SellerProducts from './containers/Seller/SellerProducts';
import SellerOrders from './containers/Seller/SellerOrders';
import SellerCustomers from './containers/Seller/SellerCustomers';
import ForgetPassword from './containers/Customer/ForgetPassword';
import SellerForgetPassword from './containers/Seller/SellerForgetPassword';
import SellerAddProduct from './containers/Seller/SellerAddProduct';
import SellerChangePassword from './containers/Seller/SellerChangePassword';
import Report from './containers/Seller/Reports';
import TagProduct from './containers/TagProduct';
import { CartProvider } from './context/CardContext';
import OrderConfirm from './containers/Customer/OrderConfirm';

function App() {
  return (
    <div>
      <Provider store={store}>
      <CartProvider>
        <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/products" element={<AllProduct />} />
            <Route exact path="/categories" element={<Categories />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/help" element={<Help />} />
            <Route exact path="/contact" element={<ContactUs />} />
            <Route exact path="/product/tag/:tag" element={<TagProduct />} />
            <Route exact path="/product/:product_slug/:product_id" element={<ProductDetail />} />
            <Route exact path="/category/:category_slug/" element={<CategoryProducts />} />
            <Route exact path="/order/success" element={<OrderSuccess />} />
            <Route exact path="/order/failure" element={<OrderFailure />} />
            {/* Customer Panel */}
            <Route exact path="/register" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/dashboard" element={<DashBoard />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/change/password" element={<ChangePassword />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path='/order/confirm' element={<OrderConfirm />} />
            <Route exact path="/wishlist" element={<WishList />} />
            <Route exact path="/addresses" element={<Addresses />} />
            <Route exact path="/add/address" element={<AddAddress />} />
            <Route exact path="/forget/password" element={<ForgetPassword />} />
            {/* Seller Panel */}
            <Route exact path="/seller/register" element={<SellerSignUp />} />
            <Route exact path="/seller/login" element={<SellerLogin />} />
            <Route exact path="/seller/dashboard" element={<SellerDashBoard />} />
            <Route exact path="/seller/products" element={<SellerProducts />} />
            <Route exact path="/seller/add/product" element={<SellerAddProduct />} />
            <Route exact path="/seller/customer" element={<SellerCustomers />} />
            <Route exact path="/seller/orders" element={<SellerOrders />} />
            <Route exact path="/seller/profile" element={<SellerProfile />} />
            <Route exact path="/seller/change/password" element={<SellerChangePassword />} />
            <Route exact path="/seller/forget/password" element={<SellerForgetPassword />} />
            <Route exact path="/seller/report" element={<Report />} />
          </Routes>
          </Layout>
          <Footer />
        </Router>
        </CartProvider>
      </Provider>
    </div>
  );
}

export default App;
