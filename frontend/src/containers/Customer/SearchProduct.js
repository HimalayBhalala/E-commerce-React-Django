import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CurrencyContext } from '../../context/CurrencyContex';

export default function SearchProduct() {

    const location = useLocation();
    const queryParams =new URLSearchParams(location.search)
    const result = queryParams.get('search')
    const { currency } = useContext(CurrencyContext);

    const [getProductData,setProductData] = useState([]);

    useEffect(() => { 
        const config = {
            headers : {
                'Content-Type':"application/json"
            }
        }
        axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/customer/search/?search=${result}`,config)
          .then((response) => {
            if (response.status === 200){
                setProductData(response.data.data);
            }else{
                setProductData([])
            }
          })
          .catch((error) => {
            console.log("Error Occure during fetching an api",String(error))
          })
    },[result])
    
  return (
    <div className='container text-center'>
        {console.log("Product",getProductData)}
      <h1 style={{ textAlign: "center" }}>Products</h1>
                <hr />
                <div className="row mt-3">
                    {
                        (getProductData.length > 0) ? ( 
                            getProductData.map((product) => (
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
                                                    currency === 'inr' ? (
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
                    ) : (
                        <div style={{backgroundColor:"red",border:"2px solid black",padding:"5rem"}}>
                            <h1 className='text-center'>No product found....</h1>
                        </div>
                    )
                }
                </div>
    </div>
  )
}
