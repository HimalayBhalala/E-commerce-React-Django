import React, { useContext, useEffect,useState } from 'react'
import SellerSideBar from './SellerSideBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CurrencyContext } from '../../context/CurrencyContex';

const SellerProducts = () => {

    const seller_id = localStorage.getItem('seller_id');
    const [getProduct,setProduct] = useState([]);
    const {getCurrency} = useContext(CurrencyContext);

    useEffect(() => {
        const getTotalProduct = async () => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/seller/products/${seller_id}`)
                setProduct(response.data.data.seller.products)
            }catch(error){
                console.log("Error during fetching an api",String(error))
            }
        } 
    getTotalProduct();
  },[seller_id])

  const deleteProduct = async (seller_id,product_id) => {
    try{
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/ecommerce/seller/products/${seller_id}/${product_id}`)
        console.log("Product deleted successfully",response.data)
        setProduct(getProduct.filter((product) => product.id !== product_id))
    }catch(error){
        console.log("Error during fetching an api",String(error))
    }
  }

  return (
    <div>
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <SellerSideBar/>
                </div>
                <div className="col-md-9" style={{marginBottom:"15rem"}}>
                    <div className='form-control'>
                        <span className='btn btn-success float-end'>
                            <Link to='/seller/add/product' className='text-white' style={{textDecorationLine:"blink"}}><i className='fa fa-plus-circle'></i> Add More Product</Link>
                        </span>
                        <hr className='mt-5'/>
                        <div className="table-responsive">
                            <table className="table table-bordered mt-2">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getProduct.map((product,index) => (
                                            <tr key={product?.id}>
                                                <td>{index + 1}</td>
                                                <td>{product?.title}</td>
                                                {
                                                    getCurrency === 'inr' ? (
                                                        <td>₹ {product?.price}</td>
                                                    ) : (
                                                        <td>$ {product?.usd_price}</td>                                                        
                                                    )
                                                }
                                                <td>Published</td>
                                                <td>
                                                    <span>
                                                        <Link className="btn btn-info ms-1" to={`/product/${product?.title}/${product?.id}`}>View</Link>
                                                        <Link className='btn btn-primary ms-1' to={`/seller/edit/product/${seller_id}/${product?.id}`}>Edit</Link>
                                                        <Link className='btn btn-danger ms-1' onClick={() => deleteProduct(seller_id,product?.id)} >Delete</Link>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default SellerProducts;
