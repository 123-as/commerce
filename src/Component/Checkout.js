import React ,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import { commerce } from './Commerce';
import Address from './Address';
import Payment from './Payment';


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
        return step===0? order&&<Address order={order} next={next}/>: <Payment back={back} order={order}  next={next}/>
    }
    return (
        <>
            <div className="ui ordered steps">
                <div className={`step ${step===0? "active":"completed"}`}>
                    <div className="content">
                        <div className="title">Shipping</div>
                        <div className="description">Choose your shipping options</div>
                    </div>
                </div>

                <div className={`step ${step<=1?"active":"completed"}`}>
                    <div className="content">
                        <div className="title">Confirm Order</div>
                        <div className="description">Verify order details</div>
                    </div>
                </div>
        </div>

        {step===2? <div>完成付款</div>: form() }
        <div>
        </div>
      </>
    )
}

export default Checkout;