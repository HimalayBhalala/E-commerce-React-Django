import React, { useEffect, useState } from 'react'
import SellerSideBar from './SellerSideBar';
import { TextField,Button } from '@mui/material';
import { change_password } from '../../actions/auth';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SellerChangePassword = ({change_password}) => {
  const username = localStorage.getItem('username')
  const user_id = localStorage.getItem('user_id');
  const [passwordStatus,setPasswordStatus] = useState(false)

  const [formData,setFormData] = useState({
    new_password : '',
    confirm_new_password : ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(passwordStatus){
      navigate("/seller/dashboard")
    }
  },[navigate,passwordStatus])

  const {new_password,confirm_new_password} = formData;

  const onChange = (e) => setFormData({
    ...formData,
    [e.target.name] : e.target.value
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(!passwordStatus){
        setPasswordStatus(true)
        await change_password(new_password,confirm_new_password,user_id);
      }else{
        navigate('/seller/dashboard')
      }
    }catch(error){
      console.log("Error During fetching an api",String(error))
    }
  };

  return (
    <div className="container mt-5" style={{marginBottom:"12rem"}}>
        <div className="row">
            <div className="col-md-3">
                <SellerSideBar />
            </div>
            <div className="col-md-9">
                <h1>Welcome, {username}</h1>
                <hr />
                <div style={{border:"2px solid black",background:"white"}}>
                    <form style={{margin:"2rem"}} onSubmit={handleSubmit}>
                        <TextField
                            label="New Password"
                            variant="outlined"
                            type='password'
                            fullWidth
                            name = "new_password"
                            margin='normal'
                            value = {new_password}
                            onChange={onChange}
                        />
                        <TextField
                          label="Confirm New Password"
                          variant='outlined'
                          type='password'
                          fullWidth
                          name='confirm_new_password'
                          margin='normal'
                          value={confirm_new_password}
                          onChange={onChange}
                        />
                        <Button className='mt-3' style={{textAlign:"center"}}
                          type='submit'
                          variant='contained'
                          color='primary'
                        >Change Password</Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
};

export default connect(null,{change_password})(SellerChangePassword);
