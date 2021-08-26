import React ,{useState,useEffect}from 'react';
import Accordion from './Accordion';
const Slider =()=>{
    const imgList=[
        {
            img:"https://cdn-origin.cool-style.com.tw/cool/2019/09/Nike-Joyride-Cushioning-White-3.jpg"
        },
        {
            img:"https://i.ytimg.com/vi/mq5royDHwZw/maxresdefault.jpg"
        },
        {
            img:"https://images.solecollector.com/complex/images/c_crop,h_664,w_1044,x_20,y_194/c_fill,dpr_2.0,f_auto,fl_lossy,q_auto,w_680/nwcosv71edxhfzr1djz6/adidas-ultra-boost-2020-3"
        }
    ]
    const [current,setcurrent]=useState(0);
   console.log(current);
    useEffect(()=>{
        const id=setInterval(()=>{
            if(current===imgList.length-1){
                setcurrent(0);
            }
            else if(current<0){
                setcurrent(imgList.length-1);
            }
            else
                setcurrent(current+1);
        },6000);

        return ()=>{
            clearInterval(id);
        }
    });
    const next=()=>{
        if(current===imgList.length-1){
            setcurrent(0);
        }
        else
            setcurrent(current+1);
    }
    const back=()=>{
        if(current===0){
            setcurrent(imgList.length-1);
        }
        else
            
        setcurrent(current-1);
    }

    return (
        <>
        <div style={{backgroundColor:"#F2F2F2"}}>
            <div className="slider container">
                <button onClick={back} className="slider-left"><i className="fas fa-arrow-circle-left"></i></button>
                <button onClick={next}  className="slider-right"><i className="fas fa-arrow-circle-right"></i></button>
                {imgList.map((item,index)=>{
                    return (
                        <div key={index} className={index===current?"slider-item-active":"slider-item"}>
                            {current===index&&<img src={item.img} className="slider-img"/>}
                        </div>
                    )
                })}
            </div>
        </div>
        
        <Accordion />

        <div style={{backgroundColor:"#F2F2F2"}}>
            <div className="icon container">
                <div className="icon-item">
                    <img src="https://www.searchpng.com/wp-content/uploads/2018/12/Oppo-Logo-Png.png" /> 
                </div>
                <div className="icon-item">
                    <img src="https://www.pngkit.com/png/full/299-2994938_free-download-tnis-nike-sb-mavrk-3-skate.png" /> 
                </div>
                <div className="icon-item">
                    <img src="https://www.downloadclipart.net/large/adidas-logo-png-picture.png" /> 
                </div>
                <div className="icon-item">
                    <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png" /> 
                </div>
                <div className="icon-item">
                    <img src="https://logos-world.net/wp-content/uploads/2020/03/Coca-Cola-Symbol.png" /> 
                </div>
            </div>
        </div>

        <div style={{textAlign:"center"}}>
                    此作品僅學習使用,無任何商業用途.
        </div>
        </>
    )
}

export default  Slider