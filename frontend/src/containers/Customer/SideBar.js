import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const SideBar = ({isAuthenticated,logout})  => {
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
    }
  },[isAuthenticated,navigate]);

  return (
    <div>
        <ul className="list-group text-center">
            <Link to='/dashboard' className="list-group-item list-group-item-action" aria-current="true">Dashboard</Link>
            <Link to='/orders' className="list-group-item list-group-item-action">Orders</Link>
            <Link to='/wishlist' className="list-group-item list-group-item-action">WishList</Link>
            <Link to='/profile' className="list-group-item list-group-item-action">Profile</Link>
            <Link to='/change/password' className="list-group-item list-group-item-action">Change Password</Link>
            <Link to='/addresses' className="list-group-item list-group-item-action">Addresses</Link>
            <Link to='/login' onClick={(e) => {e.preventDefault();logout()}} className='list-group-item list-group-item-action text-danger'>LogOut</Link>
        </ul>
    </div>
  )
};

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) =>({
  logout : () => dispatch(logout())
});

export default connect(mapStateToProps,mapDispatchToProps)(SideBar);
