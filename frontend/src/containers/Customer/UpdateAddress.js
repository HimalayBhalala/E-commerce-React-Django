import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateAddress = () => {
    const customer_id = localStorage.getItem('customer_id');
    const { address_id } = useParams();
    const [getAddressStatus,setAddressStatus] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        default_address: false
    });

    const navigate = useNavigate();

    useEffect(() => {
        if(getAddressStatus){
            navigate("/addresses")
        }
        axios.get(`${process.env.REACT_APP_API_URL}/ecommerce/customer/update-address/${customer_id}/${address_id}/`)
            .then((response) => {
                setFormData({
                    address: response.data.data.address || '',
                    default_address: response.data.data.default_address || false
                });
            })
            .catch((error) => {
                console.error("Error fetching address info", error);
            });
    }, [customer_id, address_id,getAddressStatus]);

    const onChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/ecommerce/customer/update-address/${customer_id}/${address_id}/`, formData, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                setAddressStatus(true)
                console.log("Address updated successfully", response.data);
            })
            .catch((error) => {
                console.error("Error updating address", error);
            });
    };

    return (
        <div>
            <div className="container mt-5" style={{ marginBottom: "14.90rem" }}>
                <div className="row">
                    <div className="col-md-3">
                        <SideBar />
                    </div>
                    <div className="col-md-9" style={{ border: "2px solid black" }}>
                        <h3 className='text-center mt-3'>Update Address</h3>
                        <hr />
                        <div className='mt-4'>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Address"
                                    variant='outlined'
                                    margin='normal'
                                    fullWidth
                                    value={formData.address}
                                    name="address"
                                    onChange={onChange}
                                />
                                <div>
                                    <input
                                        type="checkbox"
                                        name="default_address"
                                        value={formData.default_address}
                                        checked={formData.default_address}
                                        onChange={onChange}
                                    />
                                    &nbsp;Add default address
                                </div>
                                <div className='text-center'>
                                    <Button type='submit' color='primary' variant='contained' style={{ marginTop: "1rem" }}>
                                        Update Address
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateAddress;
