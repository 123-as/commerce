import React , {useState,useEffect} from 'react';
import { commerce } from './Commerce';
import { useSelector } from 'react-redux';
const Products=({add})=>{
    const [sort,setSort]=useState('all');
    const isSigned=useSelector((state)=>state.useID.isSigned);

    const [page,setPage]=useState(1);
    const [itemList,setItemList]=useState([]);
    useEffect(()=>{
        const getList= async()=>{
            const response=await commerce.products.list();
            let list=[];
            response.data.forEach(item=>{
                if(item.categories.some(e=>e.slug===sort)){
                   list.push(item);
                }
            })
            setItemList(list);
            setPage(1);
        }


        getList();
    },[sort]);

    
    //單格商品
    const getItem=()=>{
        let list;
        if(page===1){
             list=itemList.slice(0,4);
        }
        else if(page===2){
            list=itemList.slice(4,itemList.length);
        }
        return (
            list.map(item=>(
                <div className="products-list-item" key={item.id}>
                    <div className="products-list-image">
                        <img src={item.media.source} alt="新品"/>
                    </div>

                    <div className="products-list-content">
                        <div>
                            <div className="products-list-header">{item.name}</div>
                            <div className="products-list-description" dangerouslySetInnerHTML={{__html:item.description}}>
                            </div>
                        </div>
                        <div className="products-list-extra">
                            <span>
                                {item.price.formatted_with_symbol}
                            </span>
                            <span className="right">
                                {isSigned?<button className="products-list-btn" onClick={()=>{add(item.id)}}><i className="fas fa-shopping-cart" ></i></button>:null}
                            </span>
                        </div>
                    </div>
                </div>
            ))
        )
    }


    //判斷頁數
    const  renderPage=()=>{
        if(itemList.length!==0){
            switch(itemList.length){
                case 4:
                    return  <span onClick={()=>{setPage(1)}}>1</span>;
                default:
                    return (
                        <>
                            <span onClick={()=>{setPage(1)}}>1</span>
                            <span onClick={()=>{setPage(2)}}>2</span>
                        </>
                    )
            }
        }
    }
    return (
        <div className="products container">
            <div>
                <div className="products-menu">
                <a className="products-menu-item" onClick={()=>{setSort('all');}} href="#">
                    All
                </a>
                <a className="products-menu-item"  onClick={()=>{setSort('shoe');}} href="#">
                    Shoe
                </a>
                <a className="products-menu-item" onClick={()=>{setSort('shirt');}} href="#">
                    Shirt
                </a>
                </div>
            </div>

            {itemList.length===0?

                <div className="loading">
                    <div className="loading-time">
                    </div>
                    <div className="loading-item">
                    </div>
                    <div className="loading-text">
                        Loading
                    </div>
                </div>
                :
                <div>
                    <div className="products-list">
                        {getItem()}

                        <div className="products-page">
                            {renderPage()}
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Products;
