# 電商網站

[Demo](https://dazzling-neumann-c12db0.netlify.app/)
## 主要功能

* 登入帳號後,可以將商品加入購物車
* 結合commerce.js列出商品

### 代碼詳解

#### 1.帳號狀態切換
有新的帳號登入時,產生新的購物車的id,如果有登入過得帳號,切換購物車的id,並且使用此購物車id
``` 
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



