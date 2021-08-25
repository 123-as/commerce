import React from 'react';
import GoogleAuth from './GoogleAuth';
import {Link} from 'react-router-dom';
const Header =()=>{
    return (
        <div className="header">
            <Link to='/' className="item">ECO</Link>
            
            <div className="header-google">
                <GoogleAuth />
            </div>
        </div>
    )
}

export default Header;