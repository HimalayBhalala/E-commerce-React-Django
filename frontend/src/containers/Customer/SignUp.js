import React, { useEffect, useState } from 'react'
import {customer_register} from '../../actions/auth';
import { connect } from 'react-redux';
import { Button,TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = ({customer_register}) => {
  const [created,setCreated] = useState(false)
  const [formData,setFormData] = useState({
    email : '',
    first_name : '',
    last_name : '',
    mobile : '',
    password : '',
    confirm_password : ''
  })

  const navigate = useNavigate();

  const {email,first_name,last_name,mobile,password,confirm_password} = formData;

  const onChange = (e) => setFormData({
    ...formData,
    [e.target.name] : e.target.value
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{  
      await customer_register(email,first_name,last_name,mobile,password,confirm_password);
      setCreated(true)
    }catch(error){
      console.log("SignUp Error:"+error)
    }
  };

  useEffect(() => {
    if(created){
      navigate("/login")
    }
  },[created,navigate]);

  return (
    <div>
      <div className="container mt-5">
        <div className='text-center form-control'>
        <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={first_name}
          name='first_name'
          onChange={onChange}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={last_name}
          name='last_name'
          onChange={onChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          name='email'
          onChange={onChange}
        />
        <TextField
          label="Mobile Number"
          variant="outlined"
          margin="normal"
          fullWidth
          value={mobile}
          name='mobile'
          onChange={onChange}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          name='password'
          onChange={onChange}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={confirm_password}
          name='confirm_password'
          onChange={onChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </form>
      <div className='mt-2'>
        If Already Register ! Login here <a href='/login'>Login</a>
      </div>
    </div>
    </div>
  </div>
  )
};

export default connect(null,{customer_register})(SignUp);