import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from "../constants/cartConstants";



const addToCart = (productId , qty ) =>async (dispatch , getState)=>{
    try {
        const {data} = await axios.get("/api/products/"+productId);
        dispatch({type : CART_ADD_ITEM , payload : {
            product : data._id,
            name :data.name,
            image :data.image,
            price :data.price,
            countInStock :data.countInStock,
            qty 
        }});
        //{ cart : {cartItems}}=getState();
       localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch(error){
        console.log(error)
    }
        
    
}

const removeFromCart =(productId) => async (dispatch , getState)=>{
    dispatch({type : CART_REMOVE_ITEM , payload : productId})
    
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const saveShipping =(data)=> (dispatch)=>{
    dispatch({type : CART_SAVE_SHIPPING , payload :data });
    localStorage.setItem('shipping', JSON.stringify(data));
}  

const savePayment =(data)=> (dispatch)=>{
    dispatch({type : CART_SAVE_PAYMENT , payload :data });
    
    localStorage.setItem('payment', JSON.stringify(data));
} 


export {addToCart , removeFromCart ,saveShipping , savePayment}