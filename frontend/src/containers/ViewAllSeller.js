import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ViewAllSeller = () => {

    const baseURL = 'http://127.0.0.1:8000/ecommerce';
    const [sellers,setSellers] = useState([]);

    useEffect (() => {
        fetchData(baseURL + '/sellers/')
    },[])

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setSellers(data);
        })
        .catch((e) =>{
            console.log("Error During fetch Api"+(e))
        })
    }

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };    

  return (
    <div>
        <section className='container mt-4'>
            <h1 style={{textAlign:"center"}}>All Seller</h1>
            <hr />
            <div className="row">
                    {
                        sellers.map((seller) => (
                            <div className="col-12 col-md-3 mb-4" key={seller?.id}>
                                <Link to={`/seller/product/${seller?.id}`} style={{textDecoration:'none'}}>
                                    <div className="card fixed-size-card text-center">
                                        <img src={seller?.image} className='card-img-top large-image' alt="image13" />
                                        <div className="card-body" style={{color:"black"}}>
                                            <h5>Seller Name : {capitalizeFirstLetter(seller.user?.first_name)}</h5>
                                        </div>
                                        <div className="card-footer" style={{color:"black"}}>
                                            Categories : <Link to="/">Python</Link> , <Link href='/'>Java</Link>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
            </div>
        </section>
    </div>
  )
};

export default ViewAllSeller;
