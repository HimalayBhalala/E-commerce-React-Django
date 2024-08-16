import React, { useContext, useEffect, useState } from 'react';
import logo from '../product.jpg';
import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { CurrencyContext } from '../context/CurrencyContex';

const Home = () => {
    const baseURL = 'http://127.0.0.1:8000/ecommerce';
    const [productData, setProductsData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const {getCurrency} = useContext(CurrencyContext);
    const [popularProductData, setPopularProductData] = useState([]);
    const [popularSellerData, setPopularSellerData] = useState([]);

    useEffect(() => {
        function fetchProductData() {
            fetch(baseURL + '/home/products/')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network issue during fetching an api");
                    }
                    return response.json();
                })
                .then((data) => {
                    setProductsData(data.results);
                })
                .catch((error) => {
                    console.log("Error During fetching an api", error);
                });
        }

        function fetchCategoryData() {
            fetch(baseURL + '/home/categories/')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network issue during fetching an api");
                    }
                    return response.json();
                })
                .then((data) => {
                    setCategoryData(data.results);
                })
                .catch((error) => {
                    console.log("Error During fetching an api", error);
                });
        }

        function fetchPopularProductData() {
            fetch(baseURL + '/home/popular/products/')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network issue during fetching an api");
                    }
                    return response.json();
                })
                .then((data) => {
                    setPopularProductData(data.results);
                })
                .catch((error) => {
                    console.log("Error During fetching an api", error);
                });
        }

        function fetchPopularSellerData() {
            fetch(baseURL + '/home/popular/sellers/')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network issue during fetching an api");
                    }
                    return response.json();
                })
                .then((data) => {
                    setPopularSellerData(data.data)
                })
                .catch((error) => {
                    console.log("Error During fetching an api", error);
                });
        }

        fetchPopularProductData();
        fetchPopularSellerData();
        fetchProductData();
        fetchCategoryData();
    }, []);

    return (
        <div>
            {console.log("Popular Seller",popularSellerData)}
            <div className='container'>
                <div className="row mt-3">
                    <h3 className='mb-4'>
                        Latest Products
                        <Link to="/products" className='float-end btn btn-sm' style={{backgroundColor:"darkslategrey",color:"white"}}>
                            View All Products <i className='fa-solid fa-arrow-right-long'></i>
                        </Link>
                    </h3>
                    <div className="row">
                        {productData.slice(0, 8).map((product, index) => (
                            <SingleProduct key={index} product={product} />
                        ))}
                    </div>
                </div>
                <h3 className='mb-4'>
                    Popular Categories
                    <Link to="/categories" className='float-end btn btn-sm' style={{backgroundColor:"darkslategrey",color:"white"}}>
                        View All Categories <i className='fa-solid fa-arrow-right-long'></i>
                    </Link>
                </h3>
                <div className="row">
                    {categoryData.map((category) => (
                        <div className="col-12 col-md-3 mb-4" key={category.id}>
                            <Link style={{ color: "initial", textDecoration: 'none' }} to={`/category/${encodeURIComponent(category.title)}`}>
                                <div className="card fixed-size-card">
                                    <img src={category.category_image} className='card-img-top large-image' alt={category.title} />
                                    <div className="card-body card-background">
                                        <h4 className="card-title">Title: {category.title}</h4>
                                        <p className="card-text">Description: {category.description}</p>
                                    </div>
                                    <div className="card-footer">
                                        <h5 className='card-text text-muted'>Product Downloads: 5432</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <h3 className='mb-4'>
                    Popular Products
                    <Link to="/" className='float-end btn btn-sm' style={{backgroundColor:"darkslategrey",color:"white"}}>
                        View All Popular Products <i className='fa-solid fa-arrow-right-long'></i>
                    </Link>
                </h3>
                <div className="row">
                    {popularProductData.map((product) => (
                        <div className="col-12 col-md-3 mb-4" key={product.id}>
                            <div className="card fixed-size-card">
                                <img src={product.image} className='card-img-top large-image' alt="image9" />
                                <div className="card-body">
                                    <h4 className="card-title">{product.title}</h4>
                                    {
                                        getCurrency === 'inr' ? (
                                            <h5 className='card-title text-muted'>Price: ₹ {product.price}</h5>
                                        ) : (
                                            <h5 className='card-title text-muted'>Price: $ {product.usd_price}</h5>
                                        )
                                    }
                                </div>
                                <div className="card-footer">
                                    <button title='Add to Cart' className='btn btn-success btn-sm'>
                                        <i className='fa-solid fa-cart-plus'></i>
                                    </button>
                                    <button className="btn btn-danger btn-sm ms-1" title="Add to Wishlist">
                                        <i className='fa fa-heart'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <h3 className='mb-4'>
                    Popular Sellers
                    <Link to="/" className='float-end btn btn-sm' style={{backgroundColor:"darkslategrey",color:"white"}}>
                        View All Sellers <i className='fa-solid fa-arrow-right-long'></i>
                    </Link>
                </h3>
                <div className="row">
                    {
                        popularSellerData.map((seller) => (
                            <div className="col-12 col-md-3 mb-4">
                                <div className="card fixed-size-card">
                                    <img src={`${process.env.REACT_APP_API_URL}/${seller.image}`} className='card-img-top large-image' alt="image13" />
                                    <div className="card-body">
                                        <h4 className="card-title">{seller.first_name}</h4>
                                    </div>
                                    <div className="card-footer">
                                        Categories : <Link to="/">Python</Link> , <Link href='/'>Java</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
