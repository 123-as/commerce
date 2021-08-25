import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { commerce } from './Commerce';
import { Link } from 'react-router-dom';
const Cart=()=>{
    const userId=useSelector(state=>state.useID.id);
    const cartList=useSelector(state=>state.shopList[userId]);
    const dispatch=useDispatch();
    const cart=useSelector(state=>state.shopList);

    useEffect(()=>{
        const change=async ()=>{
                const cartID=cart[userId];
                await commerce.cart.retrieve(cartID.id);
        }

        if(userId&&cartList)
        {
            change();
        }
    },[userId])



    const rendershop=()=>{
        if(!cartList){
            return <div>Nothing</div>
        }
        return cartList.line_items.map(item=>(
            <div className="card" key={item.id}>
             
                    <div className="card-content">
                    <img src={item.media.source} className="right card-img"/>
                    <div className="card-title">
                        {item.name}
                    </div>
                    <div className="card-name">
                       quantity:{item.quantity}
                    </div>
                    <div >
                        共:{item.line_total.formatted_with_symbol}
                    </div>
                    </div>
                    <div className="card-content card-btn">
                        <div className="btn card-btn-red" onClick={()=>add(item.id,item.quantity)}>+</div>
                        <div className="btn card-btn-yellow"   onClick={()=>reduce(item.id,item.quantity)}>-</div>
                    </div>
            </div>
        ))
    }

    const add=async (id,num)=>{
        const response=await commerce.cart.update(id, { quantity: num+1 });
        dispatch({type:"SHOP_LIST",payload:{...response.cart,userId}});
    }

    const reduce=async (id,num)=>{
        const response=await commerce.cart.update(id, { quantity: num-1 });
        dispatch({type:"SHOP_LIST",payload:{...response.cart,userId}});    }

    const empty=async ()=>{
        const response=await commerce.cart.empty();
        dispatch({type:"SHOP_LIST",payload:{...response.cart,userId}});    
    }
    
    return (
        <div>
            <div className="cards">
                {rendershop()}
            </div>
            

            <div className="cards-flex cards">
                <div >
                    總價錢:{cartList&&cartList.subtotal.formatted_with_symbol}
                </div>
                <div>
                    <Link className="right  cards-btn" to='/checkout'>
                            Checkout
                    </Link>
                    <div className="right cards-btn" onClick={empty}>
                        Clean Cart
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Cart;