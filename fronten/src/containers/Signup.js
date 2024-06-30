import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { signup } from "../actions/auth";
import '../css/style.css';
import LockIcon from '@mui/icons-material/Lock';
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';


const Signup = ({ signup, isAuthenticated }) => {
    const [userCreate, setUserCreate] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: '',
    });

    const { name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(password === re_password) {
            signup (name, email, password, re_password);
            setUserCreate(true);
        }
  };

  if(isAuthenticated) {
    return <Navigate to='/' />
  }
  if(userCreate) {
    return <Navigate to='/login'/>
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
            <h2 className="fw-semibold reverse-shadow-text" style={{ display: 'flex', justifyContent: 'center', color:'white', marginTop: '30px' }}>Sign up</h2>
            <p style={{ color:'white' }}>Create your Account</p>
            <form onSubmit={onSubmit}>
            <div className="form-floating mb-3">
                <input
                    className="form-control form-control-lg"
                    type="text"
                    id="floatingInput"
                    placeholder="Name*"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                    />
                    {name ? null : <label htmlFor="floatingInput">Name</label>}
            </div>
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
            <div className="form-floating mb-3">
                <input
                    className="form-control"
                    type="password"
                    id="floatingPassword"
                    placeholder="Confirm Password"
                    name="re_password"
                    value={re_password}
                    onChange={onChange}
                    minLength="8"
                    required
                    />
                {re_password ? null : <label htmlFor="floatingInput">Confirm Password</label>}
            </div>
            <button className="btn btn-primary p-2 font-monospace fs-5" type="submit">Confirm <LoginIcon /></button>
                </form>
                <p className="mt-3" style={{ color:'white' }}>already have an account?
                <Link to="/login"> Sign in</Link>
                </p>
                
            </div>
      
    </div>
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { signup })(Signup);
