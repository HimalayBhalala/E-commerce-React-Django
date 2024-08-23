import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Addresses = () => {
    const username = localStorage.getItem('username');
    const customer_id = localStorage.getItem('customer_id');
    const [getAddress, setAddresses] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/customer/addresses/${customer_id}/`)
            .then((response) => {
                setAddresses(response.data.data);
            })
            .catch((error) => {
                console.log("Getting error during fetching an api", String(error));
            });
    }, [customer_id]);

    const removeAddress = (address_id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/ecommerce/customer/update-address/${customer_id}/${address_id}`)
        .then((response) => {
            console.log("Remove successful", response);
            setAddresses(getAddress.filter(addr => addr.id !== address_id));
        })
        .catch((error) => {
            console.log("Getting error during removing an address", String(error));
        });
    }

    return (
        <div className="container mt-5" style={{ marginBottom: "1rem" }}>
            <div className="row">
                <div className="col-md-3">
                    <SideBar />
                </div>
                <div className="col-md-9" style={{marginBottom:"10rem"}}>
                    <h1>Welcome, {username}</h1>
                    <hr />
                    <div className="row">
                        <div className="col-12">
                            <Link to="/add/address" className='btn mb-3' style={{ float: "right", backgroundColor: '#52462f', color: 'lightyellow' }}>
                                <i className='fa fa-plus-circle'></i> Add Address
                            </Link>
                        </div>
                    {
                        getAddress.map((addr) => (
                            <div className="col-md-3 offset-1 mt-1" key={addr?.id} style={{border:"2px solid black",backgroundColor:"orange"}}>
                                <Link to={`/address/${addr?.id}`} style={{textDecoration:"none"}}>
                                    <div className="card">
                                        <div className="card-body" style={{height:"15rem"}}>
                                            {
                                                (addr?.default_address) ? (
                                                    <i className='fa fa-check-circle text-success text-center mt-3 fa-1x' style={{ marginBottom: "11px" }}></i>
                                                ) : (
                                                    <div className='badge bg-dark mt-3' style={{height:"1.3rem",width:"5rem",marginLeft:"1rem"}}>
                                                        Not default
                                                    </div>
                                                )
                                            }
                                            <hr />
                                            <div className="card-title">
                                                <p className='text-muted' style={{margin:"10px",color:"maroon"}}>{addr?.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className='text-center mb-2'>
                                    <button className='btn btn-danger mt-2' onClick={() => removeAddress(addr?.id)}>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addresses;
