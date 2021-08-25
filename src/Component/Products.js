import React , {useState,useEffect} from 'react';
import { commerce } from './Commerce';
import { useSelector } from 'react-redux';

const Products=({add})=>{
    const [sort,setSort]=useState('all');
    const isSigned=useSelector((state)=>state.useID.isSigned);


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
        }


        getList();
    },[sort]);


    

    //單格商品
    const getItem=()=>{
        return (
            itemList.map(item=>(
                <div className="products-list-item" key={item.id}>
                    <div className="products-list-image">
                        <img src={item.media.source} />
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


    return (
        <div className="products">
            <div>
                <div className="products-menu">
                <a className="products-menu-item" onClick={()=>setSort('all')}>
                    All
                </a>
                <a className="products-menu-item"  onClick={()=>setSort('shoe')}>
                    Shoe
                </a>
                <a className="products-menu-item" onClick={()=>setSort('shirt')}>
                    Shirt
                </a>
                </div>
            </div>

            <div>
                <div className="products-list">
                    {getItem()}
                </div>
            </div>
        </div>
    )
}

export default Products;
