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
            <div className="four wide column card" key={item.id}>
             
                    <div className="content">
                    <img className="right floated mini ui image" src={item.media.source}/>
                    <div className="header">
                        {item.name}
                    </div>
                    <div className="meta">
                       quantity:{item.quantity}
                    </div>
                    <div className="description">
                        共:{item.line_total.formatted_with_symbol}
                    </div>
                    </div>
                    <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic green button large" onClick={()=>add(item.id,item.quantity)}>+</div>
                        <div className="ui basic red button large"   onClick={()=>reduce(item.id,item.quantity)}>-</div>
                    </div>
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
        <div className="ui grid container">
            <div className="ui cards">
                {rendershop()}
            </div>
            

            <div className="two column  row">
                <div className="column">
                    總價錢:{cartList&&cartList.subtotal.formatted_with_symbol}
                </div>
                <div className="column">
                <Link className="ui button right floated" to='/checkout'>
                        Checkout
                </Link>
                <button className="ui secondary button right floated" onClick={empty}>
                       Clean Cart
                </button>
                </div>
            </div>
        </div>
    )
}


export default Cart;