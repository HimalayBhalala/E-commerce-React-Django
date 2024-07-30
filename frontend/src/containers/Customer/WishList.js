import React, { useContext, useEffect } from 'react'
import SideBar from './SideBar';
import axios from 'axios';
import { WishListContext } from '../../context/WishListContext';
import { CurrencyContext } from '../../context/CurrencyContex';

const WishList = () => {

    const get_customer_id = localStorage.getItem('customer_id')
    const {wish_list,setWishList} = useContext(WishListContext);
    const {currency} = useContext(CurrencyContext)

    useEffect(() => {
        const getWishListData = () => {
            axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/wish-list/${parseInt(get_customer_id)}/`)
            .then((response) => {setWishList(response.data.data)})
            .catch((error) => console.log("Error during fetching api",String(error)))
        }
        getWishListData();
    },[get_customer_id])

  return (
    <div className="container mt-5" style={{marginBottom:"12rem"}}>
        <div className="row">
            <div className="col-md-3">
                <SideBar />
            </div>
            <div className="col-md-9">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>  
                        <tbody>
                            {
                                wish_list.map((products,index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>
                                            <td>
                                                <img src={`${process.env.REACT_APP_API_URL}/${products?.product.image}`} className='img-thumbnail' style={{width:"60px"}} alt={products?.product.title} />
                                            </td>
                                            <td>
                                                <p className='mt-2' style={{marginLeft:"20px"}}>{}</p>
                                            </td>
                                        </td>
                                             <td>
                                                {
                                                currency === 'inr' ? (
                                                    <p>₹ {products?.product.price}</p>
                                                ):(
                                                    <p>$ {products?.product.usd_price}</p>
                                                )
                                                }
                                            </td>
                                        <td>
                                            <button className='btn btn-danger btn-sm'>Remove</button>
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
  )
};

export default WishList;
