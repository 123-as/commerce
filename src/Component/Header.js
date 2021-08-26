import React from 'react';
import GoogleAuth from './GoogleAuth';
import {Link} from 'react-router-dom';
const Header =()=>{
    return (
        <div style={{backgroundColor:"#000"}}>
            <div className="header container">
                <Link to='/' className="header-title">ECO</Link>
                
                <div className="header-google">
                    <GoogleAuth />
                </div>
            </div>
        </div>
    )
}

export default Header;