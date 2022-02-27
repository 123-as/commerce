import React from 'react';
import GoogleAuth from './GoogleAuth';
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion';
const Header =()=>{
    return (
        <div style={{backgroundColor:"#000"}}>
            <div className="header container">
                <Link to='/' className="header-title">
                <motion.svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" style={{width:"40px",height:"40px",fill:"#fff",stroke:"#fff"}}
                >
                    <motion.path 
                        initial={{opacity:0,pathLength:0,fill:"rgba(255,255,255,0)"}}
                        animate={{opacity:1,pathLength:.5,fill:"rgba(255,255,255,1)"}}
                        transition={{duration:5,ease:"easeInOut"}}
                        d="M20,7H18.262A5.137,5.137,0,0,0,20,3a1,1,0,0,0-2,0c0,2.622-2.371,3.53-4.174,3.841A9.332,9.332,0,0,0,15,3,3,3,0,0,0,9,3a9.332,9.332,0,0,0,1.174,3.841C8.371,6.53,6,5.622,6,3A1,1,0,0,0,4,3,5.137,5.137,0,0,0,5.738,7H4a4,4,0,0,0-4,4v1a2,2,0,0,0,2,2v5a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V14a2,2,0,0,0,2-2V11A4,4,0,0,0,20,7ZM12,2a1,1,0,0,1,1,1,7.71,7.71,0,0,1-1,3.013A7.71,7.71,0,0,1,11,3,1,1,0,0,1,12,2ZM2,11A2,2,0,0,1,4,9h7v3H2Zm2,8V14h7v8H7A3,3,0,0,1,4,19Zm16,0a3,3,0,0,1-3,3H13V14h7Zm-7-7V9h7a2,2,0,0,1,2,2v1Z"
                    />
                </motion.svg>
                </Link>
                
                <div className="header-google">
                    <GoogleAuth />
                </div>
            </div>
        </div>
    )
}

export default Header;