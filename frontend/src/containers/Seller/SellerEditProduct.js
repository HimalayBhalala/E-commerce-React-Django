import React, { useContext, useEffect, useState } from 'react';
import SellerSideBar from './SellerSideBar';
import axios from 'axios';
import { CurrencyContext } from '../../context/CurrencyContex';
import { useNavigate, useParams } from 'react-router-dom';

const SellerEditProduct = () => {
    const { getCurrency } = useContext(CurrencyContext);
    const { seller_id, product_id } = useParams();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({});
    const [imageURL,setImageUrl] = useState(null);
    const [productUpdateStatus,setProductUpdateStatus] = useState(false);
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        price: '',
        usd_price: '',
        currency: '',
        description: '',
        image: null
    });

    const navigate = useNavigate();

    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/seller/products/${seller_id}/${product_id}/`);
                setProduct(response.data.data.product);
                setImageUrl(response.data.data.product.image)
            } catch (error) {
                console.error("Error fetching product", error);
            }
        };
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/seller/categories/`);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategories();
        fetchProduct();
    }, [seller_id, product_id]);

    useEffect(() => {
        if(productUpdateStatus){
            navigate("/seller/products")
        }
        if (product) {
            setFormData({
                category: product.category?.id || '',
                title: product.title || '',
                price: product.price || '',
                usd_price: product.usd_price || '',
                currency: String(getCurrency).toUpperCase(),
                description: product.description || '',
                image: product.image || null
            });
        }
    }, [product, getCurrency,productUpdateStatus,navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('category', formData.category);
        data.append('title', formData.title);
        if (formData.currency === 'INR') {
            data.append('price', formData.price);
        } else {
            data.append('usd_price', formData.usd_price);
        }
        data.append('currency', formData.currency);
        data.append('description', formData.description);
        data.append('image', formData.image);

        const config = {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        }

        try {
           const response = await axios.put(`${process.env.REACT_APP_API_URL}/ecommerce/seller/products/${seller_id}/${product_id}/`, data, config);
            setProductUpdateStatus(true)
            console.log("Product updated successfully",response.data);
        } catch (error) {
            console.error("Error updating product", error);
        }
    };

    const onChange = (e) => {
        if (e.target.name === 'image'){
            const file = e.target.files[0]
            if(file){
                console.log(file.name)
                setImageUrl(URL.createObjectURL(file))
                setFormData({
                    ...formData,
                    [e.target.name] : file
                });
            }
        }else{
            setFormData({
               ...formData,
               [e.target.name] : e.target.value
            });
        }
    };

    return (
        <div>
            {console.log("Get categories",categories)}
            <div className="container mt-5" style={{ marginBottom: "1rem" }}>
                <div className="row">
                    <div className="col-md-3">
                        <SellerSideBar />
                    </div>
                    <div className="col-md-9">
                        <div className="form-control">
                            <h5 style={{ textAlign: "center" }} className='mt-2'>Edit Product</h5>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label className='form-label' htmlFor="category">Choose Category: </label>
                                    <select className="form-select form-control" id='category' name='category' value={formData.category} onChange={onChange}>
                                        <option value="">Open this select product category</option>
                                        {categories.map((category) => (
                                            <option key={category?.id} value={category?.id}>{category?.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="currency">Currency: </label>
                                    <div className="form-control">
                                        {formData.currency === 'INR' ? 'INR' : 'USD'}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label className='form-label' htmlFor="title">Title: </label>
                                    <input className='form-control' type="text" id='title' name='title' value={formData.title} onChange={onChange} required />
                                </div>
                                {formData.currency === 'INR' ? (
                                    <div className="mt-2">
                                        <label className='form-label' htmlFor="price">Price: </label>
                                        <input className='form-control' type="number" name='price' id='price' value={formData.price} onChange={onChange} required />
                                    </div>
                                ) : (
                                    <div className="mt-2">
                                        <label className='form-label' htmlFor="usd_price">USD Price: </label>
                                        <input className='form-control' type="number" name='usd_price' id='usd_price' value={formData.usd_price} onChange={onChange} required />
                                    </div>
                                )}
                                <div className="mt-2">
                                    <label className='form-label' htmlFor="description">Description: </label>
                                    <textarea className='form-control' rows='4' cols='4' id='description' name='description' value={formData.description} onChange={onChange} required />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="image" className='form-label'>Add New Image</label>
                                    <input className='form-control' type="file" name='image' id='image' onChange={onChange} />
                                    <div className='mt-5 mb-5' style={{height:"auto",width:"10rem",alignItems:"center"}}>
                                        <img className='mt-3' style={{display: "flex",width: "-webkit-fill-available",height:"auto",objectFit:"cover"}} src={imageURL} alt="image1" />
                                    </div>
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

export default SellerEditProduct;
