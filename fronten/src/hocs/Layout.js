import React, { useEffect } from "react";
import NavBar2 from '../components/NavBar2';
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from '../actions/auth';
import Navbar from "../components/Navbar";


const Layout = (props) => {
    const { isAuthenticated } = props

    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
    }, [ isAuthenticated, props ]);

    return (
    <div>
        <Navbar /> 
        {props.children}
        
        
    </div>
    );
};
export default connect(null, { checkAuthenticated, load_user })(Layout);