import React, { useEffect, useState } from 'react'
import SideBar from './SideBar';
import { TextField,Button } from '@mui/material';
import { change_password } from '../../actions/auth';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChangePassword = ({change_password,isAuthenticated}) => {

  const username = localStorage.getItem('username');
  const user_id = localStorage.getItem('user_id');

  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/add/email')
    }
  },[isAuthenticated])

  const [formData,setFormData] = useState({
    new_password : '',
    confirm_new_password : ''
  });

  const {new_password,confirm_new_password} = formData;

  const onChange = (e) => setFormData({
    ...formData,
    [e.target.name] : e.target.value
  });

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      try{
        await change_password(new_password,confirm_new_password,user_id);
      }catch(error){
        console.log("Error During fetching an api",String(error))
      }
  };


  return (
    <div className="container mt-5" style={{marginBottom:"10.3rem"}}>
        <div className="row">
            <div className="col-md-3">
                <SideBar />
            </div>
            <div className="col-md-9">
                <h1>Welcome, {username}</h1>
                <hr />
                <div style={{border:"2px solid black",background:"white"}}>
                    <form style={{margin:"2rem"}} onSubmit={handleSubmit}>
                        <TextField
                            label="New Password"
                            variant="outlined"
                            fullWidth
                            name = "new_password"
                            margin='normal'
                            value = {new_password}
                            onChange={onChange}
                        />
                        <TextField
                          label="Confirm New Password"
                          variant='outlined'
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

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{change_password})(ChangePassword);
