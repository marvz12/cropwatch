import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth.js';
import { Link } from 'react-router-dom';


const Home = ({ isAuthenticated }) => {
    const guestLinks = () => (
        <div style={{display: "flex", justifyContent: 'center', width: '100%'}}>
            <Link className='btn btn-success btn-lg glow1' to='/login' role='button' >LOGIN</Link>
        </div>
        
        
      );
    
      const authlinks = () => (
        <div style={{display: "flex", justifyContent: 'center', width: '100%'}}>
        <Link className='btn btn-success btn-lg glow1' to='/dashboard' role='button'>DASHBOARD</Link>
        </div>
      );

    return (
        <div className='login-page'>
            <br></br><br></br>
            <div className='container p-5' style={{ backgroundColor: 'rgba(200, 197, 197, 0.7)', borderRadius: '10px' }}>
                <div className='container mt-3'>
                    <h1 className='display-3 fw-bold glow'  style={{display: "flex", justifyContent: 'center'}}>WELCOME TO CROPWATCH</h1>
                    <p className='lead fst-italic fs-3' style={{display: "flex", justifyContent: 'center'}}>Unleash the power of agricultural intelligence!</p>
                    <p></p>
                    <hr className='border border-secondary border-3 opacity-75'/>
                    
                    {isAuthenticated ? authlinks() : guestLinks()}

                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(mapStateToProps, { logout })(Home);