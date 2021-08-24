import { combineReducers } from "redux";


const auth={
    isSigned:null,
    id:null
};



const shopList=(state={},action)=>{
    switch(action.type){
        case 'SHOP_LIST':
            return {...state,[action.payload.userId]:action.payload}
        default:
            return state
    }
};



 const useID=(state=auth,action)=>{
    switch(action.type){
        case 'SIGN_IN':
            return {isSigned:true,id:action.payload};
        case "SIGN_OUT":
            return {isSigned:false,id:action.payload};
        default:
            return state;
    }
};

export default combineReducers({
    useID,
    shopList
});
