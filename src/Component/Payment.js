import React from 'react';

const Payment=({back,order,next})=>{

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

    return (
        <>
            <div style={{padding:"1rem"}}>
                {getdetail()}
                <div style={{fontWeight:"700",fontSize:"1.6rem",margin:"1.8rem 0"}} className="right">
                    總價錢:{order.live.subtotal.formatted_with_symbol}
                </div>
                <div style={{clear:"both"}} className="right">
                    <button className="payment-btn" onClick={back}>back</button>
                    <button className="payment-btn" onClick={next}>pay</button>
                </div>
            </div>
        </>
    )
}

export default Payment;