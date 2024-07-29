import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { CartContext } from '../context/CardContext';
import { connect } from 'react-redux';
import { CurrencyContext } from '../context/CurrencyContex';

const ProductDetail = ({ isAuthenticated }) => {
    const navigate = useNavigate();
    const { product_id } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [tagData, setTagData] = useState([]);
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [addCart, setAddCart] = useState(false);
    const { setCartData } = useContext(CartContext);
    const {currency} = useContext(CurrencyContext);

    const get_customer_id = JSON.parse(localStorage.getItem('customer_id'));

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/ecommerce/product/${product_id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setProductDetail(data);
                setTagData(data.tags_data || []);
                checkProductExists();
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        const fetchRelatedData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/ecommerce/product/related/${product_id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setRelatedProduct(data || []);
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        fetchData();
        fetchRelatedData();
    }, [product_id, isAuthenticated, navigate]);

    const checkProductExists = () => {
        const cartDataInfo = JSON.parse(localStorage.getItem('cartDetail')) || [];
        const exists = cartDataInfo.some(item => item.product.product_id === parseInt(product_id));
        setAddCart(exists);
    };

    const addToCart = () => {
        const getCartDetail = JSON.parse(localStorage.getItem('cartDetail')) || [];
        const product = {
            product_id: productDetail.id,
            product_description: productDetail.description,
            product_image: productDetail.image,
            product_price: productDetail.price,
            product_usd_price: productDetail.usd_price
        };
        const cartData = [...getCartDetail, { product, user: { customer_id: get_customer_id } }];
        localStorage.setItem('cartDetail', JSON.stringify(cartData));
        setAddCart(true);
        setCartData(cartData);
    };

    const removeFromCart = () => {
        const cartData = JSON.parse(localStorage.getItem('cartDetail')) || [];
        const updatedCart = cartData.filter(item => item.product.product_id !== productDetail.id);
        localStorage.setItem('cartDetail', JSON.stringify(updatedCart));
        setAddCart(false);
        setCartData(updatedCart);
    };

    const renderTags = () => (
        tagData.map((tag, index) => (
            <Link key={index} to={`/product/tag/${tag}`} className="badge bg-secondary ms-1">
                {tag}
            </Link>
        ))
    );

    return (
        <div className='container mt-5' style={{ marginBottom: '3.8rem' }}>
            <h1 className='text-center mb-5'>Product Information</h1>
            <hr />
            <div className="row mt-5 card-img-container">
                <div className="col-4">
                    <img 
                        src={productDetail.image} 
                        className='img-thumbnail mb-5' 
                        style={{ height: '30rem', width: '25rem' }} 
                        alt={productDetail.title || 'Product Image'} 
                    />
                </div>
                <div className="col-8 mt-5">
                    <p><span className="fs-4"><b>Product Title: </b></span><span className='fs-5'>{productDetail.title}</span></p>
                    <p><span className="fs-4"><b>Product Description: </b></span><span className='fs-5'>{productDetail.description}</span></p>
                    <p><span className="fs-4"><b>Product Price: </b></span><span className='fs-5'>{currency === 'inr' ? '₹' : '$'} {currency === 'inr' ? productDetail.price : productDetail.usd_price}</span></p>
                    <hr className='mt-5' />
                    <div className="mt-1 mt-5">
                        <a href="#" className='btn btn-dark btn-sm' target="_blank" rel="noopener noreferrer" title='Demo'>
                            <i className='fa-solid fa-cart-plus'></i> Demo
                        </a>
                        {
                            !addCart ? (
                                <button className='btn btn-success btn-sm ms-1' type='button' onClick={addToCart} title='Add to Cart'>
                                    <i className='fa-solid fa-cart-plus'></i> Add To Cart
                                </button>
                            ) : (
                                <button className='btn btn-warning btn-sm ms-1' type='button' onClick={removeFromCart} title='Remove from Cart'>
                                    <i className='fa-solid fa-cart-plus'></i> Remove From Cart
                                </button>
                            )
                        }
                        <button className='btn btn-primary btn-sm ms-1' title='Buy Now'>
                            <i className='fa-solid fa-bag-shopping'></i> Buy Now
                        </button>
                        <button className='btn btn-danger btn-sm ms-1' title='Wishlist'>
                            <i className='fa-solid fa-heart'></i> Wishlist
                        </button>
                    </div>
                    <div className="producttags mt-5">
                        <h5 className='mt-3'><b>Tags</b></h5>
                        {renderTags().length > 0 ? renderTags() : <p className='fs-5'>No tags available</p>}
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <h2 className='mt-5 mb-3'>Related Products</h2>
                <div id="relatedProductsSlider" className="carousel slide carousel-dark" data-bs-ride="carousel" style={{ margin: 'auto', maxWidth: '70rem' }}>
                    <div className="carousel-inner">
                        {relatedProduct.length > 0 ? (
                            relatedProduct.map((product, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} style={{ textAlign: 'center' }}>
                                    <div className="row mb-4 justify-content-center">
                                        <SingleProduct product={product} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No related products found.</p>
                        )}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#relatedProductsSlider" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#relatedProductsSlider" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(ProductDetail);
