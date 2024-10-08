import React, { useEffect, useState } from 'react';
import SellerSideBar from './SellerSideBar';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { seller_change_profile } from '../../actions/auth';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SellerProfile = ({seller_change_profile,isAuthenticated}) => {

    const seller_id = localStorage.getItem('seller_id');
    const token = localStorage.getItem('access_token');
    const [sellerInfo, setSellerInfo] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        mobile: '',
        image: '',
    });
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const {email,first_name,last_name,mobile,image} = formData;

    useEffect(() => {

        if(!isAuthenticated){
            navigate('/login')
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };
    
        axios.get(`${process.env.REACT_APP_API_URL}/auth/seller/profile/${seller_id}/`, config)
            .then((response) => {
                const data = response.data.data;
                setSellerInfo(data);
                setFormData({
                    email: data.user?.email || '',
                    first_name: data.user?.first_name || '',
                    last_name: data.user?.last_name || '',
                    mobile: data?.mobile || '',
                    image: data?.image || ''
                });
                setImageUrl(data?.image || '');
            })
            .catch((error) => {
                console.log("Error fetching the API", error);
            });
    }, [seller_id, token,navigate,isAuthenticated]);
    

    const onChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            if (file) {
                setImageUrl(URL.createObjectURL(file));
                setFormData({
                    ...formData,
                    image: file
                });
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await seller_change_profile(email,first_name,last_name,mobile,image,seller_id)
        }catch(error){
            console.log("Error occure during fetching an api",String(error))
        }
    };
    

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <SellerSideBar />
                </div>
                <div className="col-md-9" style={{marginBottom:"10rem"}}>
                    <h1>Welcome, {sellerInfo.user?.first_name}</h1>
                    <hr />
                    <div style={{ border: '2px solid black', background: 'white' }}>
                        <form style={{ margin: '2rem' }} onSubmit={handleSubmit}>
                            Email:
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={email}
                                margin="normal"
                                onChange={onChange}
                            />
                            First Name:
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="first_name"
                                margin="normal"
                                value={first_name}
                                onChange={onChange}
                            />
                            Last Name:
                            <TextField
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="last_name"
                                value={last_name}
                                onChange={onChange}
                            />
                            Mobile:
                            <TextField
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="mobile"
                                value={mobile}
                                onChange={onChange}
                            />
                            <div>
                                <label htmlFor="image">
                                    <Button component="span" style={{backgroundColor:"gray"}} className="mt-2" variant="contained">
                                        Upload New Profile Image
                                    </Button>
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={onChange}
                                    style={{ display: 'none' }}
                                />
                                {imageUrl && (
                                    <img src={imageUrl} alt="Profile" style={{ width: "50%", height: "50%", marginTop: "10px",marginLeft:"200px", borderRadius: "100%", objectFit: 'cover' }} />
                                )}
                            </div>
                            <Button type="submit" color="primary" className="mt-2" variant="contained">
                                Update Profile
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{seller_change_profile})(SellerProfile);
