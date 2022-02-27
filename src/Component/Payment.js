import React from 'react';
import { motion,AnimatePresence } from 'framer-motion';
const Payment=({back,order,next,step})=>{

    const getdetail=()=>{
        return order.live.line_items.map(item=>(      
            <div key={item.id} style={{marginBottom:"2rem"}}>  
                <div style={{fontSize:"1.2rem"}} className="right">{item.line_total.formatted_with_symbol}</div>
                <div style={{fontSize:"1.6rem",fontWeight:"800"}}>
                    {item.name}
                    </div>
                <div>
                    數量:{item.quantity}
                </div>
            </div>
        ))
    }
    const containerAnimate={
        hidden:{
            opacity:0,
            x:"100vw"
        },
        visible:{
            opacity:1,
            x:0,
            transition:{
                delay:.5
            }
        },
        exit:{
            x:"100vw",
        }
    }
    return (
            <AnimatePresence>
                {
                    step===1&&
                    <motion.div 
                    variants={containerAnimate} 
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{padding:"1rem",flex:"100%"}}
                    >
                            {getdetail()}
                            <div style={{fontWeight:"700",fontSize:"1.6rem",margin:"1.8rem 0"}} className="right">
                                總價錢:{order.live.subtotal.formatted_with_symbol}
                            </div>
                            <div style={{clear:"both"}} className="right">
                                <button className="payment-btn" onClick={back}>back</button>
                                <button className="payment-btn" onClick={next}>pay</button>
                            </div>
                    </motion.div>
                }
            </AnimatePresence>
       
    )
}

export default Payment;