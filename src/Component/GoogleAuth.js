import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Link,useHistory} from 'react-router-dom';



const GoogleAuth=()=>{
    const isSigned=useSelector((state)=>state.useID.isSigned);

    const dispatch=useDispatch();


    const history=useHistory();
    useEffect(()=>{
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'382897703094-anoltm2q433iqm1vaofap65etqs3vcfk.apps.googleusercontent.com',
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
                <div>
                <Link className="ui vertical animated button" to='/cart'>
                    <div className="hidden content">Shop</div>
                    <div className="visible content">
                        <i className="shop icon"></i>
                    </div>
                </Link>

                <button className="ui google  button red" 
                onClick={()=>{window.gapi.auth2.getAuthInstance().signOut()}}>

                    <i className="google icon"></i>
                    Sign out
                 </button>
                 </div>
            )
        else if(isSigned===false)
        return (
            <button className="ui google  button red" 
            onClick={()=>{ window.gapi.auth2.getAuthInstance().signIn()}}>


                <i className="google icon"></i>
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