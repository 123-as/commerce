import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Link,useHistory} from 'react-router-dom';



const GoogleAuth=()=>{
    const isSigned=useSelector((state)=>state.useID.isSigned);

    const dispatch=useDispatch();
    console.log(process.env.REACT_GOOGLE)

    const history=useHistory();
    useEffect(()=>{
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'382897703094-t1ej2mcduaf289glg1d2it3eo04ckguf.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                //判斷目前是否登入
                showIsSigned(window.gapi.auth2.getAuthInstance().isSignedIn.get());
                window.gapi.auth2.getAuthInstance().isSignedIn.listen(showIsSigned);
            })
        })
    },[]);

    
    const showIsSigned=(data)=>{
        if(data){
            dispatch({type:'SIGN_IN',payload:window.gapi.auth2.getAuthInstance().currentUser.get().getId()});
        }

        else {
        dispatch({type:'SIGN_OUT',payload:''});
        history.push('/');
        }
    }

    const renderButton=()=>{
        if(isSigned===null)
            return;
        else if(isSigned===true)
            return (
                <>
                <Link className="header-cart" to='/cart'>
                    <div className="header-cart-shop">Shop</div>
                    <div className="header-cart-icon">
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                </Link>

                <button className="header-btn"
                onClick={()=>{window.gapi.auth2.getAuthInstance().signOut()}}>

                    <i className="fab fa-google" style={{marginRight:"0.5rem"}}></i>
                    Sign out
                 </button>
                 </>
            )
        else if(isSigned===false)
        return (
            <button className="header-btn" 
            onClick={()=>{ window.gapi.auth2.getAuthInstance().signIn()}}>
                <i className="fab fa-google" style={{marginRight:"0.5rem"}}></i>
                Sign in
             </button>
        )
    }
    return (
        <>
            {renderButton()}
        </>
    )
}

export default GoogleAuth;