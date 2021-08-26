import React,{useState,useEffect} from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import Header from './Header';
import Products from './Products';
import { commerce } from './Commerce';
import { useDispatch ,useSelector} from 'react-redux';
import Cart from './Cart';
import Checkout from './Checkout';
import '../css/style.css';
import Slider from './Slider';
const App=()=>{
    const dispatch=useDispatch();
    const userId=useSelector((state)=>state.useID.id);
    const shopList=useSelector((state)=>Object.keys(state.shopList));
    const cart=useSelector(state=>state.shopList);
    console.log(cart);
    useEffect(()=>{
        const getShop=async ()=>{
            if(shopList.length===0|| shopList.every(item=>item!==userId)){
                const response=await commerce.cart.refresh();
                dispatch({type:"SHOP_LIST",payload:{...response,userId}});
            }
        }

        const change=async ()=>{
            if(shopList.some(item=>item===userId)){
                const cartID=cart[userId];
                await commerce.cart.retrieve(cartID.id);
            }
        }

        if(userId)
        {
            getShop();
            change();
        }
        
    },[userId]);

    const addShop=async (itemID)=>{
        const response=await commerce.cart.add(itemID, 1);
        dispatch({type:"SHOP_LIST",payload:{...response.cart,userId}});
    }

  
    


    return (
        <div>
            <BrowserRouter>
                <Header />
                <Route path='/' exact>
                    <Slider/>
                </Route>
                <Route path='/product' exact>
                    <Products add={addShop}/>
                </Route>

                <Route path='/cart' exact>
                    <Cart/>
                </Route>

                <Route path='/checkout' exact>
                    <Checkout />
                </Route>
            </BrowserRouter>
        </div>
    )
}


export default App;