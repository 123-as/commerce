import React ,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import { commerce } from './Commerce';
import Address from './Address';
import Payment from './Payment';
import {motion} from 'framer-motion';

const Checkout =()=>{
    const [step,changeStep]=useState(0);

    const userId=useSelector((state)=>state.useID.id);
    const cart=useSelector(state=>state.shopList);

    const [order,setOrder]=useState(null);
    useEffect(()=>{
        const getOrderId=async ()=>{
            const response = await commerce.checkout.generateToken(cart[userId].id, { type: 'cart'});
            setOrder(response);
        }

        if(cart[userId])
            getOrderId();

    },[userId]);

    const next=()=>{
        changeStep(step+1);
    }
    const back=()=>{
        changeStep(step-1);
    }

    const form=()=>{
    
        return  (
            <div style={{display:"flex"}}>
                {order&&<Address order={order} next={next} step={step}/> }                
                <Payment back={back} order={order}  next={next} step={step}/>
            </div> 
        )

    }
    const containerEffect={
        hidden:{
            x:"100vw",
            opacity:0
        },
        visible:{
            x:0,
            opacity:1,
            transition:{
                type:"spring",
                mass:.5,
                damping:8,
                when:"beforeChildren",
            }
        }
    }
    return (
        <motion.div className="container"
            variants={containerEffect}
            initial="hidden"
            animate="visible"
        >
            <div className="step">
                <div className={`step-item ${step===0? "active":"completed"}`}>
                    <div className="step-content">
                        <div className="step-content-area">
                            <div className="title">Shipping</div>
                            <div className="description">Choose your shipping options</div>
                        </div>
                    </div>
                </div>

                <div className={`step-item ${step<=1?"active":"completed"}`}>
                    <div className="step-content">
                        <div className="step-content-area">
                            <div className="title">Confirm Order</div>
                            <div className="description">Verify order details</div>
                        </div>
                    </div>
                </div>
            </div>

        {step===2? <div style={{padding:"1rem"}}>完成付款</div>: form() }
        <div>
        </div>
      </motion.div>
    )
}

export default Checkout;