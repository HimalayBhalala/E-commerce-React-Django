import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Categories = () => {

    const baseURL = 'http://127.0.0.1:8000/ecommerce';
    const [categories,setCategories] = useState([]);
    const [totalResult,setTotalResult] = useState(0);

    useEffect (() => {
        fetchData(baseURL + '/categories/')
    },[])

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setCategories(data.results);
            setTotalResult(data.count)
        })
        .catch((e) =>{
            console.log("Error During fetch Api"+(e))
        })
    }

    function changeUrl(baseurl){
        fetchData(baseurl)
    }

    const resultsPerPage = 3;
    const totalPages = Math.ceil(totalResult / resultsPerPage);
    const links = [];
    for(let i=1;i<=totalPages;i++){
        console.log(i)
        links.push(
            <li className="page-item"><Link className="page-link" key={i} onClick={() => changeUrl(baseURL + `/categories/?page=${i}`)} to={`/categories/?page=${i}`}>{i}</Link></li>
        )
    }

  return (
    <div>
        <section className='container mt-4'>
            <h1 style={{textAlign:"center"}}>All Categories</h1>
            <hr />
            <div className="row">
                {
                    categories.map((category) => {
                        return <div className="col-12 col-md-3 mb-4 offset-1" key={category.id}>
                                <Link className='link' style={{color:"initial"}} to={`/category/${category.title}`}>
                                    <div className="card fixed-size-card">
                                            <img src={category.category_image} className='card-img-top large-image' alt={category.title} />
                                        <div className="card-body card-background">
                                            <h4 className="card-title">Title : {category.title}</h4>
                                            <p className="card-title">Description : {category.description}</p>
                                        </div> 
                                        <div className="card-footer">
                                            <h5 className='card-title text-muted'>Product Downloads:5432</h5>
                                        </div>
                                    </div>
                                </Link>
                                </div>
                        })
                }
            </div>
            <nav aria-label="Page navigation example" style={{ marginTop: "2rem" }}>
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <Link 
                                className="page-link" 
                                onClick={() => changeUrl(baseURL + `/categories/?page=${totalPages}`)}
                                to={`/categories/?page=${1}`}
                                aria-label="Previous"
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </Link>
                        </li>
                        {links}
                        <li className="page-item">
                            <Link 
                                className="page-link" 
                                onClick={() => changeUrl(baseURL + `/categories/?page=${totalPages}`)}
                                to={`/categories/?page=${totalPages}`}
                                aria-label="Next"
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
        </section>
    </div>
  )
};

export default Categories;
