import React, { useEffect, useState } from 'react';
import SellerSideBar from './SellerSideBar';
import axios from 'axios';

const SellerAddProduct = () => {
    const seller_id = localStorage.getItem('seller_id');
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        price: '',
        usd_price:'',
        currency: 'INR',
        description: '',
        image: null
    });
    const [categories, setCategories] = useState([]);

    const { category, title, price,usd_price,currency, description, image } = formData;

    useEffect(() => {
        const GetData = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/seller/categories/`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log("Error occurred during fetching the API", String(error));
            });
        }
        GetData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('category', category);
        data.append('title', title);
        if (formData.currency === 'INR'){
            data.append('price', price);
        }else{
            data.append('usd_price', usd_price);
        }
        data.append('currency', currency);
        data.append('description', description);
        if (image) {
            data.append('image', image);
        }

        axios.post(`${process.env.REACT_APP_API_URL}/ecommerce/seller/add/product/${seller_id}/${category}/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log("Product Added Successfully", response);
            })
            .catch((error) => {
                console.log("Error occurred during API request", String(error));
            });
    };

    const onChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    return (
        <div>
            <div className="container mt-5" style={{ marginBottom: "1rem" }}>
                {console.log("Category",formData)}
                <div className="row">
                    <div className="col-md-3">
                        <SellerSideBar />
                    </div>
                    <div className="col-md-9">
                        <div className="form-control">
                            <h5 style={{ textAlign: "center" }} className='mt-2'>Add New Product</h5>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label className='form-label' htmlFor="category">Choose Category: </label>
                                    <select className="form-select form-control" id='category' name='category' value={category} onChange={onChange}>
                                        <option value="">Open this select product category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label className='form-label' htmlFor="currency">Currency: </label>
                                    <select className="form-select form-control" id='currency' name='currency' value={currency} onChange={onChange}>
                                        <option value="INR">INR</option>
                                        <option value="USD">USD</option>
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label className='form-label' htmlFor="title">Title: </label>
                                    <input className='form-control' type="text" id='title' name='title' value={title} onChange={onChange} required />
                                </div>
                                {
                                    formData.currency === 'INR'? (
                                        <div className="mt-2">
                                            <label className='form-label' htmlFor="price">Price: </label>
                                            <input className='form-control' type="number" name='price' id='price' value={price} onChange={onChange} required />
                                        </div>
                                    ) : (
                                        <div className="mt-2">
                                            <label className='form-label' htmlFor="usd_price">USD Price: </label>
                                            <input className='form-control' type="number" name='usd_price' id='usd_price' value={usd_price} onChange={onChange} required />
                                        </div>
                                    )
                                }
                                <div className="mt-2">
                                    <label className='form-label' htmlFor="description">Description: </label>
                                    <textarea className='form-control' rows='4' cols='4' id='description' name='description' value={description} onChange={onChange} required />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="image" className='form-label'>Choose Image</label>
                                    <input className='form-control' type="file" name='image' id='image' onChange={onChange} />
                                </div>
                                <div className='text-center'>
                                    <button type='submit' className='btn btn-primary mt-3 mb-3'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerAddProduct;
