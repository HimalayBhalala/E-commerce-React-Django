import React, { Fragment, useContext} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import { CartContext } from '../context/CardContext';
import { CurrencyContext } from '../context/CurrencyContex';

const Navbar = ({ logout,isAuthenticated}) => {
  const cartData = useContext(CartContext);
  const {currency,setCurrency} = useContext(CurrencyContext);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid lm-sm" style={{ marginLeft: "6em", marginRight: "2em" }}>
          <Link className="navbar-brand" to="/">E-Commerce</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              {
                isAuthenticated ? (
                  <Fragment>
                    <Link className='nav-link' to="/categories">Category</Link>
                    <Link className='nav-link' to="/checkout">My Cart (<span className='text-white'>{cartData.cartData.length}</span>)</Link>
                  </Fragment>
                ) : (
                  null
                )
              }
              <div className="dropdown">
                <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown">
                  My Account
                </button>
                <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownMenuButton2">
                  {
                    isAuthenticated ? (
                      <Fragment>
                        <li><Link className="dropdown-item" to="/dashboard">DashBoard</Link></li>
                        <li><Link className="dropdown-item" to="/checkout">CheckOut</Link></li>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <li><Link className="dropdown-item" to="/register">Register</Link></li>
                        <li><Link className="dropdown-item" to="/login">Login</Link></li>
                        <li><Link className="dropdown-item" to="/forget/password">Forget Password</Link></li>
                      </Fragment>
                    )
                  }
                </ul>
              </div>
              <li className='nav-link'>
                <select value={currency} onChange={handleCurrencyChange}>
                  <option value="inr">INR</option>
                  <option value="usd">USD</option>
                </select>
              </li>
              {
                isAuthenticated ? (
                  <Fragment>
                  <div className="dropdown">
                  <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown">
                    Seller Panel
                  </button>
                  <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownMenuButton2">
                    <li><Link className="dropdown-item" to="/seller/register">Register</Link></li>
                    <li><Link className="dropdown-item" to="/seller/login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/seller/forget/password">Forget Password</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/seller/dashboard">DashBoard</Link></li>
                  </ul>
                  </div>
                  </Fragment>
                ):(
                  null
                )
              }
              {
                isAuthenticated ? (
                  <Link to='/login' className='nav-link' onClick={(e) => { e.preventDefault(); logout() }}>Logout</Link>
                ) : (
                  null
                )
              }
              {
                isAuthenticated ? (
                    <Link to='/profile' className='nav-link'>
                      <img className='profile-image' src='' alt="no-image"/>
                    </Link>
                ) : (
                  null
                )
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
