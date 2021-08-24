import React from 'react';

const Payment=({back,order,next})=>{
    console.log(order);

    const getdetail=()=>{
        return order.live.line_items.map(item=>(      
            <div className="item" key={item.id}>
                <div className="right floated content">
                <div className="content">{item.line_total.formatted_with_symbol}</div>
                </div>
                <div className="content">
                <div className="header">{item.name}</div>
                    數量:{item.quantity}
                </div>
            </div>
        ))
    }

    return (
        <>
            <div className="ui middle aligned divided list">
                {getdetail()}
                <div className="ui header">
                    總價錢:{order.live.subtotal.formatted_with_symbol}
                </div>
                <div>
                    <button className="ui button" onClick={back}>back</button>
                    <button className="ui button" onClick={next}>pay</button>
                </div>
            </div>
        </>
    )
}

export default Payment;