import React from 'react';
import GoogleAuth from './GoogleAuth';
import {Link} from 'react-router-dom';
const Header =()=>{
    return (
        <div className="ui menu secondary">
            <Link to='/' className="item">ECO</Link>
            
            <div className="right menu">
                <GoogleAuth />
            </div>
        </div>
    )
}

export default Header;