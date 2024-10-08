import React, { useEffect, useState } from 'react'
import SideBar from './SideBar';
import { TextField,Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {
    const customer_id = localStorage.getItem('customer_id');
    const [addressStatus,setAddressStatus] = useState(false);
    const [formData,setFormData] = useState({
        address:''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if(addressStatus){
            navigate('/addresses')
        }
    },[addressStatus])

    const {address} = formData;

    const onChange = (e) => setFormData({
        ...formData,
        [e.target.name] : e.target.value
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        try{
            axios.post(`${process.env.REACT_APP_API_URL}/ecommerce/customer/address/${customer_id}/`,formData,{headers:{"Content-Type":"application/json"}})
            .then((response) => {
                console.log("Response Data",response.data)
                setAddressStatus(true)
            })
            .catch((error) => {
                console.log("Error occure during fetching an api",String(error))
            })
        }catch(error){
            console.log("Error occure during fetching an api")
        }
    }
  return (
    <div>
        <div className="container mt-5" style={{marginBottom:"1rem"}}>
            <div className="row">
                <div className="col-md-3">
                    <SideBar />
                </div>
                <div className="col-md-9" style={{border:"2px solid black", marginBottom:"10rem"}}>
                    <h3 className='text-center mt-3'>Add New Address</h3>
                    <hr />
                    <div className='mt-4'>
                        <form className='form-control' onClick={handleSubmit}>
                            <TextField
                                label="Address"
                                variant='outlined'
                                margin='normal'
                                fullWidth
                                value={address}
                                name="address"
                                onChange={onChange}
                            />
                            <div className='text-center'>
                                <Button type='submit' color='primary' variant='contained' style={{marginTop:"1rem",textAlign:"center"}}>
                                    Add Address
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default AddAddress;
