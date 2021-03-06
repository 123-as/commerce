import { useForm } from "react-hook-form";
import React,{useEffect,useState} from 'react';
import { commerce } from "./Commerce";
import {motion,AnimatePresence} from 'framer-motion';
const Address =({order,next,step})=>{
    const {register,handleSubmit,formState:{errors}}=useForm();

    const [countries,setCountries]=useState([]);
    const [country,setCountry]=useState('');

    const [states,setStates]=useState([]);
    const [state,setState]=useState('');

    const [ships,setships]=useState([]);
    const [ship,setship]=useState('');

    const countArr=Object.entries(countries).map(([id,value])=>{return {id,value} });
    const stateArr=states&&Object.entries(states).map(([id,value])=>{return {id,value} });
    
    useEffect(()=>{
        const getCountry=async ()=>{
            const response =await commerce.services.localeListShippingCountries(order.id);
            setCountries(response.countries);
            setCountry(Object.keys(response.countries)[0]);
        };

            getCountry();

    },[]);


    useEffect(()=>{
        const getStates=async ()=>{
            const response =await commerce.services.localeListSubdivisions(country);
            setStates(response.subdivisions);
            setState(Object.keys(response.subdivisions)[0]);
        }

        if(country)
            getStates();
    },[country])

    useEffect(()=>{
        const getShip=async ()=>{
            const response =await commerce.checkout.getShippingOptions(order.id, {
                country: country,
                region: state,
              })
            setships(response);
            setship(response[0].id);
        }

        if(state)
            getShip();
    },[state])


    const onSubmit=()=>{
        next();
    }
    return (
        <AnimatePresence>
            {
                step===0&&
                <motion.form  exit={{x:"-100vw"}} className="form"  onSubmit={handleSubmit(onSubmit)}>
                    <motion.h4 className="form-title"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    >
                        Shipping Information
                    </motion.h4>
                    <motion.div 
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:.5}}
                    >
                        <label>Name</label>
                        <div className="form-row">
                            <div className="form-column">
                                <input type="text"  placeholder="First Name" {...register("firstName",{required:true})} autoComplete="off"/>
                                {errors.firstName&&(
                                <div className="form-error">
                                    <div className="form-error-name">?????????????????????</div>
                                </div>) }
                            </div>
        
                            <div className="form-column">
                                <input type="text"  placeholder="Last Name" {...register("lastName",{required:true})} />
                                {errors.lastName&&(
                                <div className="form-error">
                                    <div className="form-error-name">?????????????????????</div>
                                </div>) }
                            </div>
                        </div>
        
                    <div className="form-row">
                        <div className="form-column">
                            <label>Country</label>
                            <select className="form-select" {...register("country")} onChange={(e)=>setCountry(e.target.value)}>
                                {countArr.map(item=>(
                                    <option key={item.id} value={item.id}>{item.value}</option>
                                ))}
                            </select>
                        </div>
        
                        <div className="form-column">
                            <label>State</label>
                            <select className="form-select" {...register("state")}>
                                {stateArr.map(item=>(
                                    <option key={item.id} value={item.id}>{item.value}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                
                    <div className="form-row">
                        <div className="form-column">
                            <label>Shippment</label>
                            <select className="form-select" {...register("ship")}>
                            {ships.map(item=>(
                                <option onChange={(e)=>setCountry(e.target.value)} key={item.id} value={item.id}>{`${item.description}--${item.price.formatted_with_symbol}`}</option>
                            ))}
                            </select>
                        </div>    
                    </div>
        
                    <div >
                        <button  className="form-button">Submit</button>
                    </div>
                    </motion.div>
                </motion.form>
            }
        
        </AnimatePresence>
    )
}

export default Address;