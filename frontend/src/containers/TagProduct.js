import React, { useEffect, useState } from 'react';
import SingleProduct from './SingleProduct';
import { useParams } from 'react-router-dom';

const TagProduct = () => {
    const baseURL = 'http://127.0.0.1:8000/ecommerce';
    const [tagProducts, setTagProducts] = useState([]);
    const { tag } = useParams();

    useEffect(() => {
        fetchData(baseURL + `/product/tag/${tag}`);
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
                setTagProducts(data); 
            })
            .catch(error => {
                console.error('Error during fetching the API:', error);
            });
    };

    return (
        <div>
            <section className='container mt-4'>
                <h1 style={{ textAlign: "center" }}>Products Tag</h1>
                <hr />
                <div className="row mt-3">
                    {tagProducts.map((product, index) => (
                        <SingleProduct key={index} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TagProduct;
