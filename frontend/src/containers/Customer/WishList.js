import React, { useContext, useEffect } from 'react';
import SideBar from './SideBar';
import axios from 'axios';
import { CurrencyContext } from '../../context/CurrencyContex';
import { WishListContext } from '../../context/WishListContext';

const WishList = () => {
    const getCustomerId = parseInt(localStorage.getItem('customer_id'));
    const { wish_list, setWishList } = useContext(WishListContext);
    const { currency } = useContext(CurrencyContext);

    useEffect(() => {
        const fetchWishListData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/wish-list/${getCustomerId}/`);
                setWishList(response.data.data);
            } catch (error) {
                console.error("Error fetching wishlist data:", error);
            }
        };

        fetchWishListData();
    }, [getCustomerId, setWishList]);

    const removeFromWishList = async (product_id, customer_id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/ecommerce/product-wishlist/${customer_id}/${product_id}/`);
            setWishList(prevWishList => prevWishList.filter(item => item.product.id !== product_id));
        } catch (error) {
            console.error("Error removing item from wishlist:", error);
        }
    };

    return (
        <div className="container mt-5" style={{ marginBottom: "12rem" }}>
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
                                    wish_list.length > 0 ? (
                                        wish_list.map((item, index) => (
                                            <tr key={item.product.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img
                                                        src={`${process.env.REACT_APP_API_URL}/${item.product.image}`}
                                                        className='img-thumbnail'
                                                        style={{ width: "60px" }}
                                                        alt={item.product.title}
                                                    />
                                                    <span style={{ marginLeft: "20px" }}>{item.product.title}</span>
                                                </td>
                                                <td>
                                                    {currency === 'inr' ? (
                                                        <p>₹ {item.product.price}</p>
                                                    ) : (
                                                        <p>$ {item.product.usd_price}</p>
                                                    )}
                                                </td>
                                                <td>
                                                    <button
                                                        className='btn btn-danger btn-sm'
                                                        onClick={() => removeFromWishList(item.product.id, getCustomerId)}
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">No items in the wishlist</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishList;
