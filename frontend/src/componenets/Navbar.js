import React, { useContext,useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth';
import { CartContext } from '../context/CardContext';
import { CurrencyContext } from '../context/CurrencyContex';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = ({ logout, isAuthenticated, profile_image }) => {
  const role = JSON.parse(localStorage.getItem('role')) || null;
  const cartData = useContext(CartContext);
  const { getCurrency, setCurrency } = useContext(CurrencyContext);
  const [formData, setFormData] = useState([]);
  const {themeMode,setThemeMode} = useContext(ThemeContext);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const changeMode = () => {
    const newMode = themeMode === "dark" ? "light" : "dark"
    setThemeMode(newMode)
  }

  const { search } = formData;

  const onChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${themeMode === "dark"?"light" : "dark"} bg-${themeMode === "dark"?"light" : "dark"}`}>
        <div className="container-fluid lm-sm" style={{ marginLeft: "6em", marginRight: "2em" }}>
          <Link className="navbar-brand" to="/">E-Commerce</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <form className='text-center'>
                <div className="form-check form-switch text-center" style={{marginTop:"0.6rem",marginRight:"5rem"}}>
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" name="mode" value={themeMode} checked={themeMode === "dark" ? true : false} onClick={() => changeMode()}/>
                  <label className="form-check-label" for="flexSwitchCheckChecked" style={{color : themeMode === "dark" ? "black" : "white"}}>{themeMode === "dark" ? "Dark" : "Light"}</label>
                </div>
              </form>

              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              <Link className='nav-link' to="/categories">Category</Link>

              {isAuthenticated && role === 'customer' && (
                <Link className='nav-link' to="/checkout">
                  My Cart (<span style={{color : themeMode === "dark" ? "black" : "white"}}>{cartData.cartData.length}</span>)
                </Link>
              )}

              <div className="dropdown">
                <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown">
                  {(role === null) ? ('My Account') : ( (role === 'customer') ? 'My Account' : 'Seller Panel')}
                </button>
                <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownMenuButton2">
                  {isAuthenticated ? (
                    role === 'customer' ? (
                      <>
                        <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                        <li><Link className="dropdown-item" to="/checkout">Checkout</Link></li>
                      </>
                    ) : (
                      role === 'seller' && (
                        <>
                          <li><Link className="dropdown-item" to="/seller/dashboard">Dashboard</Link></li>
                        </>
                      )
                    )
                  ) : (
                    <>
                      <li><Link className="dropdown-item" to="/register">Register</Link></li>
                      <li><Link className="dropdown-item" to="/login">Login</Link></li>
                      <li><Link className="dropdown-item" to="/forget/password">Forget Password</Link></li>
                    </>
                  )}
                </ul>
              </div>

              <li className='nav-link'>
                <select value={getCurrency} onChange={handleCurrencyChange}>
                  <option value="inr">INR</option>
                  <option value="usd">USD</option>
                </select>
              </li>

              <div>
                <form>
                  <input type="search" className='mt-1' onChange={onChange} name='search' value={search} id='search' />
                  <Link to={`/search?search=${search}`} className='btn' style={{ backgroundColor: "gray" }}>Search</Link>
                </form>
              </div>

              {
                isAuthenticated ? (
                  <>
                    <Link to='/login' className='nav-link' onClick={(e) => { e.preventDefault(); logout() }}>Logout</Link>
                  </>
                ) : (
                  null
                )
              }
              {
                isAuthenticated ? (
                  role === 'customer' ? (
                    <Link to='/profile' className='nav-link'>
                      <img className='profile-image' src={profile_image} alt="Profile" />
                    </Link>
                    ) : (
                       <Link to='/seller/profile' className='nav-link'>
                         <img className='profile-image' src={profile_image} alt="Profile" />
                      </Link>
                    )
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
  isAuthenticated: state.auth.isAuthenticated,
  profile_image: state.auth.profile_image
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
