import React ,{useState}from 'react';

const Accordion=()=>{
    const [current,setCurrent]=useState(null);

    const setActive=(index)=>{
        if(index===current){
            setCurrent(-1);
        }
        else 
            setCurrent(index);
    }
    const list=[
        {
            title:"提供的服務?",
            content:"擁有最新最流行的衣服,並且登入帳號後,可以加入購物車購買!!"
        },
        {
            title:"如何建立購物清單?",
            content:"到產品頁面中,將自己喜歡的商品加入購物車,就可以在購物車裡看見."
        },
        {
            title:"我購買的商品需要退貨,該怎麼做呢?",
            content:"如果對於產品有不滿意的話,在一個星期內,攜帶完整的包裝及電子發票,使用郵寄方式寄回,確認好商品後我們會將錢匯過去."
        }
    ];


    const renderList=()=>{
        return list.map((item,index)=>{
            return (
                <div key={index} className="ac-item" onClick={(e)=>{e.stopPropagation();setActive(index)}}>
                    <div className="ac-title">
                    <span style={{fontSize:"24px"}}>{item.title}</span>
                        <div>
                        {current===index?
                        <i className="fas fa-minus" style={{marginRight:"5px"}}></i>:
                        <i className="fas fa-plus" style={{marginRight:"5px"}}></i>}
                        </div>
                    </div>

                    <div className={current===index?"ac-active ac-content":"ac-content ac-hidden"} >
                        {current===index&&item.content}
                    </div>
                </div>
            )
        })
    }
    return (
        
        <div onClick={()=>setActive(-1)} className="accordion" >
            <div className="container ac">
                {renderList()}
            </div>
        </div>
    )
}

export default Accordion;