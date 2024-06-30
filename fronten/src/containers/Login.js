import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from "../actions/auth";
import '../css/style.css';
import LockIcon from '@mui/icons-material/Lock';
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';



const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    
  };

  if(isAuthenticated) {
    return <Navigate to='/' />
  }

  return (
    <div className="login-page" style={{ display: 'flex', justifyContent: 'center' }}>
        <br></br><br></br>
        <div className="p-4" style={{ maxWidth: "600px", backgroundColor: "rgba(35, 35, 34, 0.9)", borderRadius: "10px" }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ bgcolor: '#f50057'}}>
                <LockIcon />
            </Avatar>
            </div>
            <h2 className="fw-semibold reverse-shadow-text" style={{ display: 'flex', justifyContent: 'center', color:'white', marginTop: '30px' }}>Sign In</h2>
            <p style={{ color:'white' }}>Sign in to your Account</p>

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
            <div className="form-floating mb-3">
                <input
                    className="form-control"
                    type="password"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    minLength="8"
                    required
                    />
                {password ? null : <label htmlFor="floatingInput">Password</label>}
            </div>
            <button className="btn btn-primary p-2 font-monospace fs-5" type="submit">Login <LoginIcon /></button>
                </form>
                <p className="mt-3" style={{ color:'white' }}>Don't have an account?
                <Link to="/signup"> Sign up</Link>
                </p>
                <p className="mt-3" style={{ color:'white' }}>Forgot your password?
                <Link to="/reset-password"> Reset Password</Link>
                </p>
            </div>
      
    </div>
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { login })(Login);
