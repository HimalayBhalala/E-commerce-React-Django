import React from 'react';
import { Link } from 'react-router-dom';

const SingleProduct = (props) => {
    return (
        <div className="col-12 col-md-3 mb-4">
                <div className="card card-img-container">
                <Link to={`/product/${props.product?.title}/${props.product?.id}`} style={{ textDecoration: 'none' }}>
                    <img src={props.product?.image} className="card-img-top" alt={props.product?.title} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                    <div className="card-body card-background">
                        <h4 className="card-title">
                            <Link className='link' style={{ color: "initial" }} to={`/product/${props.product?.title}/${props.product?.id}`}>
                                {props.product?.title}
                            </Link>
                        </h4>
                        <h5 className='card-title' style={{ color: 'darkslategrey' }}>Price: {props.product.price}</h5>
                    </div>
                </Link>
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
    );
};

export default SingleProduct;
