import React, { useEffect } from 'react';
import Navbar from '../componenets/Navbar';
import { customer_checkAuthenticated, seller_checkAuthenticated } from '../actions/auth';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Layout = ({ customer_checkAuthenticated, seller_checkAuthenticated, children }) => {
  const role = JSON.parse(localStorage.getItem('role'));
  const navigate = useNavigate();

  useEffect(() => {
    if (role === null || role === '') {
      navigate('/select/role');
    } else if (role === 'customer') {
      customer_checkAuthenticated();
    } else if (role === 'seller') {
      seller_checkAuthenticated();
    }
  }, [role, navigate, customer_checkAuthenticated, seller_checkAuthenticated]);

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

const mapDispatchToProps = {
  customer_checkAuthenticated,
  seller_checkAuthenticated
};

export default connect(null, mapDispatchToProps)(Layout);
