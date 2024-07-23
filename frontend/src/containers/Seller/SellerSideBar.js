import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';

const SellerSideBar = ({ isAuthenticated,logout })  => {

    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated){
            navigate("/login")
        }
    },[isAuthenticated,navigate]);

  return (
    <div>
        <ul className="list-group text-center">
            <Link to='/seller/dashboard' className="list-group-item list-group-item-action" aria-current="true">Dashboard</Link>
            <Link to='/seller/products' className="list-group-item list-group-item-action">Products</Link>
            <Link to='/seller/add/product' className="list-group-item list-group-item-action">Add Product</Link>
            <Link to='/seller/customer' className="list-group-item list-group-item-action">Customer</Link>
            <Link to='/seller/orders' className="list-group-item list-group-item-action">Orders</Link>
            <Link to='/seller/profile' className="list-group-item list-group-item-action">Profile</Link>
            <Link to='/seller/change/password' className="list-group-item list-group-item-action">Change Password</Link>
            <Link to='/seller/report' className='list-group-item list-group-item-action'>Reports</Link>
            <Link to="/login" onClick={(e) => {e.preventDefault();logout()}} className='list-group-item list-group-item-action text-danger'>LogOut</Link>
        </ul>
    </div>
  )
};

const mapStateToProps = (state) => ({
    isAuthenticated:state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
    logout : () => dispatch(logout())
});

export default connect(mapStateToProps,mapDispatchToProps)(SellerSideBar);
