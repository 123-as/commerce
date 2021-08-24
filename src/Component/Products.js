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
                <div className="card" key={item.id}>
                    <div className="image">
                        <img src={item.media.source} />
                    </div>
                    <div className="content">
                        <div className="header">{item.name}</div>
                        <div className="description" dangerouslySetInnerHTML={{__html:item.description}}>
                        </div>
                    </div>
                    <div className="extra content">
                        <span>
                            {item.price.formatted_with_symbol}
                        </span>
                        <span className="right floated">
                            {isSigned?<button className="ui button" onClick={()=>{add(item.id)}}><i className="shop icon " ></i></button>:null}
                        </span>
                    </div>
                </div>
            ))
        )
    }


    return (
        <div className="ui grid">
            <div className="three wide column">
                <div className="ui vertical fluid tabular menu">
                <a className="item " onClick={()=>setSort('all')}>
                    All
                </a>
                <a className="item"  onClick={()=>setSort('shoe')}>
                    Shoe
                </a>
                <a className="item" onClick={()=>setSort('shirt')}>
                    Shirt
                </a>
                </div>
            </div>
            <div className="thirteen wide stretched column">
                <div className="ui  cards">
                    {getItem()}
                </div>
            </div>
        </div>
    )
}

export default Products;
