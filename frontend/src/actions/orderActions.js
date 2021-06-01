import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST , ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants";


export const createOrder = (order) => async (dispatch ,  getState) =>{

    dispatch({type : ORDER_CREATE_REQUEST , payload : order });
    try {
        const {userSignin : {userInfo}} = getState();
        const {data} = await Axios.post("/api/orders", order , 
            { 
                headers : {
                Authorization :   `Bearer ${ userInfo.token}`,
                },
            }
        );

        dispatch({type : ORDER_CREATE_SUCCESS , payload : data.order })
        dispatch({type : CART_EMPTY , payload : data.order })
        localStorage.removeItem('cartItems');
        
    } catch (error) {
        dispatch({type : ORDER_CREATE_FAIL , payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }

}



export const detailsOrder =  (orderId) => async (dispatch ,  getState) =>{

    dispatch({type : ORDER_DETAILS_REQUEST , payload : orderId });
    const {userSignin :{userInfo}} = getState();
    try {
        
        const {data} = await Axios.get(`/api/orders/${orderId}`, 
            { 
                headers : {
                Authorization : `Bearer ${userInfo.token}`,
                },
            }
        );
        
        dispatch({type : ORDER_DETAILS_SUCCESS , payload : data });

    } catch(error) {
        dispatch({type : ORDER_DETAILS_FAIL , payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }

}


export const payOrder = (order ,response) => async (dispatch ,  getState) =>{

    dispatch({type : ORDER_PAY_REQUEST , payload : response ,order  });

    const {userSignin :{userInfo}} = getState();

    console.log(response , order );

    const authAxios =Axios.create({
        baseURL :"",    
        headers : {
            Authorization : `Bearer ${userInfo.token}`
        }
     })
    try {
        
        const {data} = await authAxios.get(`/api/orders/${order._id}/pay/${order.user}/${response.razorpay_payment_id}/${response.razorpay_order_id}/${response.razorpay_signature}`,response);
        
        dispatch({type : ORDER_PAY_SUCCESS , payload : data });

    }catch(error) {
        dispatch({ type : ORDER_PAY_FAIL , payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }

}


export const listOrderMine =  () => async (dispatch ,  getState) =>{


    dispatch({type : ORDER_MINE_LIST_REQUEST });

    const {userSignin :{userInfo}} = getState();
    try {
        
        const {data} = await Axios.get('/api/orders/mine', 
            { 
                headers : {
                Authorization : `Bearer ${userInfo.token}`,
                },
            }
        );
        
        dispatch({type : ORDER_MINE_LIST_SUCCESS,  payload : data });

    } catch(error) {
        dispatch({type : ORDER_MINE_LIST_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }

}

