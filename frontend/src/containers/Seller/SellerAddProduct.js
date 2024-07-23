import React, { useState } from 'react';
import SellerSideBar from './SellerSideBar';

const SellerAddProduct = () => {
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        price: '',
        description: '',
        image: ''
    });

    const { category, title, price, description, image } = formData;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <div className="container mt-5" style={{ marginBottom: "1rem" }}>
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
                                    <select className="form-select form-control" id='category' aria-label="Default select example" name='category' value={category} onChange={onChange}>
                                        <option value="">Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label className='form-label' htmlFor="title">Title: </label>
                                    <input className='form-control' type="text" id='title' name='title' value={title} onChange={onChange} required />
                                </div>
                                <div className="mt-2">
                                    <label className='form-label' htmlFor="price">Price: </label>
                                    <input className='form-control' type="number" name='price' id='price' value={price} onChange={onChange} required />
                                </div>
                                <div className="mt-2">
                                    <label className='form-label' htmlFor="description">Description: </label>
                                    <textarea className='form-control' rows='4' cols='4' id='description' name='description' value={description} onChange={onChange} required />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="image" className='form-label'>Choose Image</label>
                                    <input className='form-control' type="file" name='image' id='image' value={image} onChange={onChange} />
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
