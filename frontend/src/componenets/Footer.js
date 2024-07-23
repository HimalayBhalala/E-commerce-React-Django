import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <footer className="text-center text-white bg-dark">
        <div className="container">
          <section className="mt-5">
            <div className="row text-center d-flex justify-content-center pt-5">
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/about" className="text-white">About us</Link>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/products" className="text-white">Products</Link>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/categories" className="text-white">Categories</Link>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/help" className="text-white">Help</Link>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="/contact" className="text-white">Contact</Link>
                </h6>
              </div>
            </div>
          </section>
          <hr className="my-5" />
          <section className="mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  distinctio earum repellat quaerat voluptatibus placeat nam,
                  commodi optio pariatur est quia magnam eum harum corrupti
                  dicta, aliquam sequi voluptate quas.
                </p>
              </div>
            </div>
          </section>
          <section className="text-center mb-5">
            <Link to="/" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="/" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="/" className="text-white me-4">
              <i className="fab fa-google"></i>
            </Link>
            <Link to="/" className="text-white me-4">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="/" className="text-white me-4">
              <i className="fab fa-linkedin"></i>
            </Link>
            <Link to="/" className="text-white me-4">
              <i className="fab fa-github"></i>
            </Link>
          </section>
        </div>
        <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © 2024 Copyright:
          <Link target='_blank' className="text-white" to="https://mdbootstrap.com/">MDBootstrap.com</Link>
        </div>
      </footer>
    </div>
  );
}
