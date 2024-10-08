import React, { useContext, useEffect, useState } from 'react';
import SellerSideBar from './SellerSideBar';
import axios from 'axios';
import { CurrencyContext } from '../../context/CurrencyContex';
import { useNavigate } from 'react-router-dom';

const SellerAddProduct = () => {
    const seller_id = localStorage.getItem('seller_id');
    const {getCurrency} = useContext(CurrencyContext);
    const [imageURL,setImageUrl] = useState(null);
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        price: '',
        usd_price:'',
        tags : '',
        currency: String(getCurrency).toUpperCase() ,
        description: '',
        image: null
    });
    const [categories, setCategories] = useState([]);
    const [getProductStatus,setProductStatus] = useState(false)

    const navigate = useNavigate();

    const { category, title, price,usd_price,tags,currency, description, image } = formData;

    useEffect(() => {
        if(getProductStatus){
            navigate("/seller/products")
        }

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
    }, [getProductStatus,navigate]);

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
        data.append('tags',tags);
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
                setProductStatus(true)
                console.log("Product Added Successfully", response);
            })
            .catch((error) => {
                console.log("Error occurred during API request", String(error));
            });
    };

    const onChange = (e) => {
        if (e.target.name === 'image'){
            const file = e.target.files[0]
            if(file){
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
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <SellerSideBar />
                    </div>
                    <div className="col-md-9" style={{marginBottom:"2rem"}}>
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
                                    <label htmlFor="currency">Currency: </label>
                                    <div className="form-control" id='currency' name='currency' value={currency} onChange={onChange}>
                                        {(String(getCurrency).toUpperCase() === 'INR') ? 
                                        (   
                                            <div value="INR">INR</div> 
                                        ) : 
                                        (
                                            <div value="USD">USD</div>
                                        )}
                                    </div>
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
                                    <label className='form-label' htmlFor="tags">Tags: </label>
                                    <input className='form-control' type="text" id='tags' name='tags' value={tags} onChange={onChange}/>
                                </div>
                                <div className="mt-2">
                                    <label className='form-label' htmlFor="description">Description: </label>
                                    <textarea className='form-control' rows='4' cols='4' id='description' name='description' value={description} onChange={onChange} required />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="image" className='form-label'>Add New Image</label>
                                    <input className='form-control' type="file" name='image' id='image' onChange={onChange} />
                                    <div className='mt-5 mb-5' style={{height:"auto",width:"10rem",alignItems:"center"}}>
                                        <img className='mt-3' style={{width: "-webkit-fill-available",height:"auto",objectFit:"cover",display:imageURL ? 'block' : 'none'}} src={imageURL} alt='product_img' />
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

export default SellerAddProduct;
