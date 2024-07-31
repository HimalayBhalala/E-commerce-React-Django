import React, { useState } from 'react'
import SideBar from './SideBar';
import { TextField,Button } from '@mui/material';

const ChangePassword = () => {

  const [formData,setFormData] = useState({
    new_password : '',
    confirm_new_password : ''
  });

  const {new_password,confirm_new_password} = formData;

  const onChange = (e) => setFormData({
    ...formData,
    [e.target.name] : e.target.value
  });

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Chnage Passwor is working")
  };


  return (
    <div className="container mt-5" style={{marginBottom:"10.3rem"}}>
        <div className="row">
            <div className="col-md-3">
                <SideBar />
            </div>
            <div className="col-md-9">
                <h1>Welcome, xyz</h1>
                <hr />
                <div style={{border:"2px solid black",background:"white"}}>
                    <form style={{margin:"2rem"}} onClick={handleSubmit}>
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

export default ChangePassword;
