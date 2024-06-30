import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { activation } from "../actions/auth";
import '../css/style.css';



const Activate = ({ activation }) => {
  const {uid, token} = useParams();
  const [activate, setActivate] = useState(false);

  const activateAccount = e => {
    
    activation(uid, token);
    setActivate(true);
  };

  
  if(activate) {
    return <Navigate to = '/'/>
  }

  return (
    <div className="login-page" style={{ display: 'flex', justifyContent: 'center' }}>
        <br></br><br></br>
        <div className="p-4" style={{ maxWidth: "600px", backgroundColor: "rgba(35, 35, 34, 0.9)", borderRadius: "10px" }}>
            <div className="d-flex flex-column justify-content-center align-items-center"
                    style={{ marginTop: '100px' }}>

                <h1 style={{ color: 'white' }}>Verify your account</h1>
                <button onClick={activateAccount} style={{ marginTop: '50px' }} type="button" className="btn btn-primary">
                    Click here!
                </button>

            </div>

        </div>
      
    </div>
  );
};



export default connect(null, { activation })(Activate);
