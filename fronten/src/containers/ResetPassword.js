import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { resPassword } from "../actions/auth";
import '../css/style.css';
import LockIcon from '@mui/icons-material/Lock';
import Avatar from '@mui/material/Avatar';
import LockResetIcon from '@mui/icons-material/LockReset';


const Password_Reset = ({ resPassword }) => {
    const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    
  });

  const { email } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    resPassword(email);
    setRequestSent(true);
  };

  if(requestSent) {
    return <Navigate to='/' />
  }

  return (
    <div className="login-page" style={{ display: 'flex', justifyContent: 'center' }}>
        <br></br><br></br>
        <div className="p-4" style={{ width: "320px", backgroundColor: "rgba(35, 35, 34, 0.9)", borderRadius: "10px" }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ bgcolor: '#f50057'}}>
                <LockIcon />
            </Avatar>
            </div>
            <h2 className="fw-semibold" style={{ display: 'flex', textAlign: 'center', color:'white', marginTop: '30px' }}>Request Password Reset</h2>
            <br></br>
            <form onSubmit={onSubmit}>
                <div className="form-floating mb-3">
                    <input
                        className="form-control form-control-lg"
                        type="email"
                        id="floatingInput"
                        placeholder="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        />
                        {email ? null : <label htmlFor="floatingInput">Email Address</label>}
                </div>
            
                <button className="btn btn-primary p-2 font-monospace fs-5" type="submit">Sent Request <LockResetIcon /></button>
            </form>
                
                
        </div>
      
        </div>
    );
};




export default connect(null, { resPassword })(Password_Reset);
