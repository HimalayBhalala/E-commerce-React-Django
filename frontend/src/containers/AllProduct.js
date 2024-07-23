import React, { useEffect, useState } from 'react'
import SingleProduct from './SingleProduct';
import { Link } from 'react-router-dom';

const AllProduct = () => {
    const baseURL = 'http://127.0.0.1:8000/ecommerce'
    const [products,setProduct] = useState([]);
    const [totalResults,setTotalResults] = useState(0);

    useEffect(() => {
        fetchData(baseURL + '/products')
    },[]);
    
    
    function fetchData(baseurl){
        fetch(baseurl)
        .then((responce) => responce.json())
        .then((data) => {
            setProduct(data.results);
            setTotalResults(data.count);
        }
    )
    };

    function changeUrl(baseURL){
        fetchData(baseURL)
    };
    var links = [];
    const result = 1;
    for(let i=1;i<=totalResults/result;i++){
        links.push(
            <li key={i} className="page-item"><Link className="page-link" onClick={() => changeUrl(baseURL + `/products/?page=${i}`)} to={`/products/?page=${i}`}>{i}</Link></li>
        )
    }

  return (
    <div>
        <section className='container mt-4'>
            <h1 style={{textAlign:"center"}}>Products</h1>
            <hr />
            <div className="row mt-3">
                {
                    products.map((product) => {
                        return <SingleProduct key={product.id} product={product}></SingleProduct>
                    })
                }
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {links}
                </ul>
            </nav>
        </section>
    </div>
  )
};

export default AllProduct;