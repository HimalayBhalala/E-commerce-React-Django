import React, { useEffect, useState } from 'react';
import SingleProduct from './SingleProduct';
import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
    const baseURL = 'http://127.0.0.1:8000/ecommerce';
    const [categoryProducts, setCategoryProducts] = useState([]);
    const { category_slug } = useParams();

    useEffect(() => {
        fetchData(baseURL + `/category/title/${category_slug}/`);
    }, []); 

    const fetchData = (url) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCategoryProducts(data); 
            })
            .catch(error => {
                console.error('Error during fetching the API:', error);
            });
    };

    return (
        <div>
            <section className='container mt-4'>
                <h1 style={{ textAlign: "center" }}>Products of {category_slug} Category</h1>
                <hr />
                <div className="row mt-3">
                    {categoryProducts.map((product, index) => (
                        <SingleProduct key={index} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CategoryProducts;
