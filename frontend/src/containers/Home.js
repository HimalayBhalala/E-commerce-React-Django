import React, { useContext, useEffect, useState } from 'react';
import logo from '../product.jpg';
import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { CurrencyContext } from '../context/CurrencyContex';
import { styled } from '@mui/material';

const Home = () => {
    const baseURL = 'http://127.0.0.1:8000/ecommerce';
    const [productData, setProductsData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const { getCurrency } = useContext(CurrencyContext);
    const [popularProductData, setPopularProductData] = useState([]);
    const [popularSellerData, setPopularSellerData] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await fetch(baseURL + '/home/products/');
                if (!productResponse.ok) throw new Error("Network issue during fetching products");
                const productData = await productResponse.json();
                setProductsData(productData.results);

                const categoryResponse = await fetch(baseURL + '/home/categories/');
                if (!categoryResponse.ok) throw new Error("Network issue during fetching categories");
                const categoryData = await categoryResponse.json();
                setCategoryData(categoryData.results);

                const popularProductResponse = await fetch(baseURL + '/home/popular/products/');
                if (!popularProductResponse.ok) throw new Error("Network issue during fetching popular products");
                const popularProductData = await popularProductResponse.json();
                setPopularProductData(popularProductData.results);

                const popularSellerResponse = await fetch(baseURL + '/home/popular/sellers/');
                if (!popularSellerResponse.ok) throw new Error("Network issue during fetching popular sellers");
                const popularSellerData = await popularSellerResponse.json();
                setPopularSellerData(popularSellerData.data);
            } catch (error) {
                console.error("Error during fetching data", error);
            } finally {
                setLoader(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className='container'>
                {
                    loader ? (
                        <div className='spin-loader mt-5 mb-5' style={{margin:"auto"}}>
                        </div>
                    ) : (
                        <>
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
                                <Link to={`/product/${product.category.title}/${product.id}`} style={{textDecoration:"none" ,color:"black"}}>
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
                                </Link>
                                </div>
                            ))}
                        </div>
                        <h3 className='mb-4'>
                            Popular Sellers
                            <Link to="/seller" className='float-end btn btn-sm' style={{backgroundColor:"darkslategrey",color:"white"}}>
                                View All Sellers <i className='fa-solid fa-arrow-right-long'></i>
                            </Link>
                        </h3>
                        <div className="row">
                                {
                                    popularSellerData.map((seller) => (
                                        <div className="col-12 col-md-3 mb-5" key={seller.id}>
                                            <Link to={`/seller/product/${seller.id}`} style={{textDecoration:'none'}}>
                                                <div className="card fixed-size-card text-center">
                                                    <img src={`${process.env.REACT_APP_API_URL}/${seller.image}`} className='card-img-top large-image' alt="image13" />
                                                    <div className="card-body" style={{color:"black"}}>
                                                        <h5>Seller Name : {seller.first_name}</h5>
                                                    </div>
                                                    <div className="card-footer" style={{color:"black"}}>
                                                        Categories : <Link to="/">Python</Link> , <Link href='/'>Java</Link>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                }
                        </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Home;
