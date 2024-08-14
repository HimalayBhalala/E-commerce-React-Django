import React, { useState } from 'react';
import SellerSideBar from './SellerSideBar';
import axios from 'axios';

const AddCategory = () => {
    const seller_id = localStorage.getItem('seller_id');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category_image: null
    });

    const { title, description, category_image } = formData;

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('category_image', category_image);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        axios.post(`${process.env.REACT_APP_API_URL}/ecommerce/seller/add/category/${seller_id}/`, data, config)
            .then((response) => {
                console.log("Add Product Response", response);
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
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <SellerSideBar />
                    </div>
                    <div className="col-md-9" style={{marginBottom:"19.1rem"}}>
                        <div className="form-control">
                            <h5 style={{ textAlign: "center" }} className='mt-2'>Add New Product Category</h5>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <div className="mt-2">
                                    <label className='form-label' htmlFor="title">Title: </label>
                                    <input className='form-control' type="text" id='title' name='title' value={title} onChange={onChange} required />
                                </div>
                                <div className="mt-2">
                                    <label className='form-label' htmlFor="description">Description: </label>
                                    <textarea className='form-control' rows='4' cols='4' id='description' name='description' value={description} onChange={onChange} required />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="category_image" className='form-label'>Choose Image</label>
                                    <input className='form-control' type="file" name='category_image' id='category_image' onChange={onChange} />
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

export default AddCategory;
