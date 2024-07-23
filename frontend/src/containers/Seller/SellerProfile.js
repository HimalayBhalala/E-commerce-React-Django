import React, { useState } from 'react';
import SellerSideBar from './SellerSideBar';
import { TextField, Button } from '@mui/material';

const SellerProfile = () => {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        profile_image: { name: '', url: '' },
    });
    const [imageUrl, setImageUrl] = useState('');
    const { email, first_name, last_name,profile_image } = formData;

    const onChange = (e) => {
        if (e.target.name === 'profile_image') {
            setImageUrl(URL.createObjectURL(e.target.files[0]));
            setFormData({
                ...formData,
                profile_image: { name: e.target.files[0].name, url: '' },
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <SellerSideBar />
                </div>
                <div className="col-md-9">
                    <h1>Welcome, xyz</h1>
                    <hr />
                    <div style={{ border: '2px solid black', background: 'white' }}>
                        <form style={{ margin: '2rem' }} onSubmit={handleSubmit}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={email}
                                margin="normal"
                                onChange={onChange}
                            />
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                name="first_name"
                                margin="normal"
                                value={first_name}
                                onChange={onChange}
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="last_name"
                                value={last_name}
                                onChange={onChange}
                            />
                            <div>
                            <label htmlFor="profile_image">
                                <Button component="span" color="grey" className="mt-2" variant="contained">
                                    Upload Profile Image
                                </Button>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="profile_image"
                                name="profile_image"
                                onChange={onChange}
                                style={{display:'none'}}
                            />
                            {imageUrl && (
                                <img src={imageUrl} alt="profile_image" style={{width:"100%",height:"100%",marginTop:"10px"}} />
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

export default SellerProfile;
