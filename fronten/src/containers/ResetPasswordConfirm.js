import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { resNewPassword } from "../actions/auth";
import '../css/style.css';
import LockIcon from '@mui/icons-material/Lock';
import Avatar from '@mui/material/Avatar';
import LockResetIcon from '@mui/icons-material/LockReset';


const Password_Reset_Confirm = ({ resNewPassword }) => {
    const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: '',
    
  });
  const { uid, token } = useParams();

  const { new_password, re_new_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    resNewPassword(uid, token, new_password, re_new_password);
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
                        className="form-control"
                        type="password"
                        id="floatingPassword"
                        placeholder="New Password"
                        name="new_password"
                        value={new_password}
                        onChange={onChange}
                        minLength="8"
                        required
                        />
                    {new_password ? null : <label htmlFor="floatingInput">New Password</label>}
                </div>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        type="password"
                        id="floatingPassword"
                        placeholder="Confirm New Password"
                        name="re_new_password"
                        value={re_new_password}
                        onChange={onChange}
                        minLength="8"
                        required
                        />
                    {re_new_password ? null : <label htmlFor="floatingInput">Confirm New Password</label>}
                </div>
            
                <button className="btn btn-primary p-2 font-monospace fs-5" type="submit">Reset Password <LockResetIcon /></button>
            </form>
                
                
        </div>
      
        </div>
    );
};




export default connect(null, { resNewPassword })(Password_Reset_Confirm);
