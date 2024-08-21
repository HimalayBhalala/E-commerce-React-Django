import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { CartContext } from '../context/CardContext';
import { connect } from 'react-redux';
import axios from 'axios';
import { WishListContext } from '../context/WishListContext';
import { CurrencyContext } from '../context/CurrencyContex';
import RatingReview from './Customer/RatingReview';
import { TextField } from '@mui/material';
import { RatingContext } from '../context/RatingContext';

const ProductDetail = ({ isAuthenticated }) => {
    const navigate = useNavigate();
    const { product_id } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [tagData, setTagData] = useState([]);
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [addCart, setAddCart] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const { setCartData } = useContext(CartContext);
    const { getCurrency } = useContext(CurrencyContext);
    const { wish_list } = useContext(WishListContext);
    const { setRatingInfo } = useContext(RatingContext);
    const [getIsInRating, setIsInRating] = useState(false);
    const [getReviewForm, setReviewForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [getRatingData, setRatingData] = useState([]);
    const [visibleReviews, setVisibleReviews] = useState(1);
    const [showMore, setShowMore] = useState(true);
    const getCustomerId = parseInt(localStorage.getItem('customer_id'));
    const [formData, setFormData] = useState({ review: '' });

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
                checkIfInWishlist();
                checkRatingIsAdded();
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        const checkRatingIsAdded = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/customer/rating/${getCustomerId}/${product_id}/`);
                setRatingInfo(response.data.data);
                checkIfRatingExists(response.data.data);
            } catch (error) {
                console.error("Error occurred during fetching an API", String(error));
            }
        };

        const fetchRelatedData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/ecommerce/product/related/${product_id}/`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setRelatedProduct(data || []);
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        const getRatingInformation = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/rating/review/${product_id}/`)
                    .then((response) => {
                        setRatingData(response.data.data);
                    })
            } catch (error) {
                console.log("Error during fetching an api", String(error));
            }
        };

        fetchData();
        fetchRelatedData();
        getRatingInformation();
    }, [product_id, isAuthenticated, navigate, wish_list, getCustomerId]);

    const checkProductExists = () => {
        const cartDataInfo = JSON.parse(localStorage.getItem('cartDetail')) || [];
        const exists = cartDataInfo.some(item => item.product.product_id === parseInt(product_id));
        setAddCart(exists);
    };

    const checkIfInWishlist = () => {
        const exists = wish_list.some(item => item.product.id === parseInt(product_id));
        setIsInWishlist(exists);
    };

    const checkIfRatingExists = (ratingInfo) => {
        const exists = ratingInfo.some(item => item.product.id === parseInt(product_id));
        setIsInRating(exists);
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
        const cartData = [...getCartDetail, { product, user: { customer_id: getCustomerId } }];
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

    const addProductToWishlist = async (product_id, customer_id) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/ecommerce/product-wishlist/${customer_id}/${product_id}/`);
            setIsInWishlist(true);
        } catch (error) {
            console.log("Error adding product to wishlist:", String(error));
        }
    };

    const removeProductFromWishlist = () => {
        setIsInWishlist(false);
    };

    const renderTags = () => (
        tagData.map((tag, index) => (
            <Link key={index} to={`/product/tag/${tag}`} className="badge bg-secondary ms-1">
                {tag}
            </Link>
        ))
    );

    const reviewIsAdded = () => {
        setReviewForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        formData['rating'] = rating;
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/ecommerce/customer/rating/${getCustomerId}/${productDetail?.id}/`, formData);
            if (response.status === 201) {
                console.log("Reviews added Successfully", response);
                setFormData({ review: '' });
                setRating(0);
                setReviewForm(false);
            }
        } catch (error) {
            console.log("Error occurred during fetching an API", String(error));
        } finally {
            setIsSubmitting(false);
        }
    };

    const onChange = (e) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const handleShowMore = () => {
        if (visibleReviews < getRatingData.length) {
            setVisibleReviews(prev => prev + 1);
            if (visibleReviews >= getRatingData.length) {
                setShowMore(false);
            }
        }
    };

    const { review } = formData;

    return (
        <div className='container mt-5'>
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
                    <p><span className="fs-4"><b>Product Price: </b></span><span className='fs-5'>{getCurrency === 'inr' ? '₹' : '$'} {getCurrency === 'inr' ? productDetail.price : productDetail.usd_price}</span></p>
                    <hr className='mt-5' />
                    <div className="mt-1 mt-1">
                        {
                            !addCart ? (
                                <button className='btn btn-success btn-sm ms-1' type='button' onClick={addToCart} title='Add to Cart'>
                                    <i className='fa-solid fa-cart-plus'></i> Add To Cart
                                </button>
                            ) : (
                                <button className='btn btn-warning btn-sm ms-1' type='button' onClick={removeFromCart} title='Remove from Cart'>
                                    <i className='fa-solid fa-cart-arrow-down'></i> Remove From Cart
                                </button>
                            )
                        }
                        <button className='btn btn-primary btn-sm ms-1' title='Buy Now'>
                            <i className='fa-solid fa-bag-shopping'></i> Buy Now
                        </button>
                        <button 
                            className='btn btn-danger btn-sm ms-1' 
                            title='Wishlist' 
                            onClick={() => {
                                if (isInWishlist) {
                                    removeProductFromWishlist();
                                } else {
                                    addProductToWishlist(productDetail.id, getCustomerId);
                                }
                            }}
                            disabled={isInWishlist}
                        >
                            <i className='fa-solid fa-heart'></i> {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                        <button className='btn btn-dark btn-sm ms-1' title='Add Review & Rating' disabled={getIsInRating}>
                            <span onClick={reviewIsAdded}><i className="fa-regular fa-star"></i> Add Review & Rating</span>
                        </button>
                    </div>
                    <div className="producttags mt-1">
                        <h5 className='mt-3'><b>Tags</b></h5>
                        {renderTags().length > 0 ? renderTags() : <p className='fs-5'>No tags available</p>}
                    </div>
                    <div>
                        <h5 className='mt-3'><b>Rating and Reviews</b></h5>
                        {
                            getRatingData.length < 1 ? (
                                <p className='text-center mt-2' style={{ fontSize: "1.5rem" }}>Rating and Review is not available.</p>
                            ) : (
                                <div>
                                    {
                                        getRatingData.slice(0, visibleReviews).map((review, index) => (
                                            <div key={index} className='read-only form-control mb-3'>
                                                <b>Customer name :</b> {review.first_name} <br />
                                                <b>Rating :</b> <RatingReview rating={review.rating} /> <br />
                                                <b>Review :</b> {review.review}
                                            </div>
                                        ))
                                    }
                                    {showMore && getRatingData.length > visibleReviews && (
                                        <button className='btn btn-primary mt-3' onClick={handleShowMore}>
                                            Show More
                                        </button>
                                    )}
                                </div>
                            )
                        }
                    </div>
                    {
                        getReviewForm ? (
                            <div className='mt-2'>
                                <form className='form-control' onSubmit={handleSubmit}>
                                    <p style={{ fontSize: "2rem" }}>Select Rating
                                        <RatingReview name='rating' rating={rating} setRating={setRating} />
                                    </p>
                                    <hr />
                                    <p style={{ fontSize: "2rem" }}>Review</p>
                                    <TextField 
                                        type='text'
                                        fullWidth
                                        margin='normal' 
                                        name='review'
                                        value={review}
                                        onChange={onChange}
                                    />
                                    <button className='btn btn-primary mt-3' style={{ margin: "auto", alignItems: "center" }} type='submit' disabled={isSubmitting}>
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </button>
                                </form>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <h2 className='mt-5 mb-3'>Related Products</h2>
                <hr />
                <div id="relatedProductsSlider" className="carousel slide carousel-dark mt-5" data-bs-ride="carousel" style={{ margin: 'auto', maxWidth: '70rem' }}>
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
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#relatedProductsSlider" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
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
