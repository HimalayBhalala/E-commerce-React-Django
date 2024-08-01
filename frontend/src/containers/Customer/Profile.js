import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const Profile = () => {
    const customer_id = localStorage.getItem('customer_id');
    const token = localStorage.getItem('access_token');
    const [customerInfo, setCustomerInfo] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        mobile: '',
        image: { name: '', url: '' },
    });
    const [imageUrl, setImageUrl] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const { email, first_name, last_name,mobile,image } = formData;

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        axios.get(`${process.env.REACT_APP_API_URL}/auth/customer/profile/${customer_id}/`, config)
            .then((response) => {
                const data = response.data.data;
                setCustomerInfo(data);
                setFormData({
                    email: data.user?.email || '',
                    first_name: data.user?.first_name || '',
                    last_name: data.user?.last_name || '',
                    mobile: data?.mobile || '',
                    image: data?.image ? { name: '', url: data.image } : { name: '', url: '' }
                });
                setImageUrl(data?.image || '');
            })
            .catch((error) => {
                console.log("Error fetching the API", String(error));
            });
    }, [customer_id, token]);

    const onChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            if (file) {
                setImageUrl(URL.createObjectURL(file));
                setSelectedImage(file);
                setFormData({
                    ...formData,
                    image: { name: file.name, url: '' },
                });
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        };

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('email', email);
        formDataToSubmit.append('first_name', first_name);
        formDataToSubmit.append('last_name', last_name);
        formDataToSubmit.append('mobile', mobile);
        if (selectedImage) {
            formDataToSubmit.append('profile_image', selectedImage);
        }

        axios.put(`${process.env.REACT_APP_API_URL}/auth/customer/profile/${customer_id}/`, formDataToSubmit, config)
            .then((response) => {
                console.log("Profile updated successfully", response.data);
            })
            .catch((error) => {
                console.log("Error updating profile", String(error));
            });
    };

    return (
        <div className="container mt-5" style={{ marginBottom: '2rem' }}>
            <div className="row">
                <div className="col-md-3">
                    <SideBar />
                </div>
                <div className="col-md-9">
                    <h1>Welcome, {customerInfo.user?.first_name}</h1>
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
                                    <Button component="span" color="grey" className="mt-2" variant="contained">
                                        Upload New Profile Image
                                    </Button>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="image"
                                    name="image"
                                    onChange={onChange}
                                    style={{ display: 'none' }}
                                />
                                {imageUrl && (
                                    <img src={imageUrl} alt="Profile" style={{ width: "100%", height: "auto", marginTop: "10px",borderRadius:"100%",objectFit:'cover'}} />
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

export default Profile;
