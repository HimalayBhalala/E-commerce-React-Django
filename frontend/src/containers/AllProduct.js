import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyContext } from '../context/CurrencyContex';

const AllProduct = () => {
    const baseURL = 'http://127.0.0.1:8000/ecommerce';
    const [products, setProduct] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const { getCurrency } = useContext(CurrencyContext);

    useEffect(() => {
        fetchData(baseURL + '/products');
    }, []);
    
    function fetchData(baseurl) {
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setProduct(data.results);
            setTotalResults(data.count);
        });
    };

    function changeUrl(baseURL) {
        fetchData(baseURL);
    };

    const resultsPerPage = 3;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const links = [];

    for (let i = 1; i <= totalPages; i++) {
        links.push(
            <li key={i} className="page-item">
                <Link 
                    className="page-link" 
                    onClick={() => changeUrl(baseURL + `/products/?page=${i}`)}
                    to={`/products/?page=${i}`}
                >
                    {i}
                </Link>
            </li>
        );
    }

    return (
        <div>
            <section className='container mt-4'>
                <h1 style={{ textAlign: "center" }}>Products</h1>
                <hr />
                <div className="row mt-3">
                    {
                        products.map((product) => (
                            <div key={product.id} className="col-12 col-md-3 mb-4 offset-1">
                                <div className="card fixed-size-card" style={{width:"90%"}}>
                                    <Link to={`/product/${product?.title}/${product?.id}`} style={{ textDecoration: 'none' }}>
                                        <img 
                                            src={product?.image} 
                                            className="card-img-top large-image" 
                                            alt={product?.title} 
                                        />
                                        <div className="card-body">
                                            <h4 className="card-title small-title">
                                                <Link className='link' style={{ color: "initial" }} to={`/product/${product?.title}/${product?.id}`}>
                                                    {product?.title}
                                                </Link>
                                            </h4>
                                            {
                                                getCurrency === 'inr' ? (
                                                    <h5 className='card-price small-price' style={{ color: 'darkslategrey' }}>
                                                        Price: ₹ {product.price}
                                                    </h5>
                                                ) : (
                                                    <h5 className='card-price small-price' style={{ color: 'darkslategrey' }}>
                                                        Price: $ {product.usd_price}
                                                    </h5>
                                                )
                                            }
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
                        ))
                    }
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <Link 
                                className="page-link" 
                                onClick={() => changeUrl(baseURL + `/products/?page=${1}`)}
                                to={`/products/?page=${1}`}
                                aria-label="Previous"
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </Link>
                        </li>
                        {links}
                        <li className="page-item" style={{marginBottom:"1.5rem"}}>
                            <Link 
                                className="page-link" 
                                onClick={() => changeUrl(baseURL + `/products/?page=${totalPages}`)}
                                to={`/products/?page=${totalPages}`}
                                aria-label="Next"
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </section>
        </div>
    );
};

export default AllProduct;
