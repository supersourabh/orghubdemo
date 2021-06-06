import Axios from "../../node_modules/axios/index";
import { ORDER_REMOVE_FAIL, ORDER_REMOVE_REQUEST, ORDER_REMOVE_SUCCESS, PRODUCT_ADS_CREATE_FAIL, PRODUCT_ADS_CREATE_REQUEST, PRODUCT_ADS_CREATE_SUCCESS, PRODUCT_ADS_DELETE_FAIL, PRODUCT_ADS_DELETE_REQUEST, PRODUCT_ADS_DELETE_SUCCESS, PRODUCT_ADS_FAIL, PRODUCT_ADS_REQUEST, PRODUCT_ADS_SUCCESS, USERS_ADMIN_FAIL, USERS_ADMIN_REQUEST, USERS_ADMIN_SUCCESS } from "../constants/adminConstants";
import { ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstants";
import { USERS_LIST_FAIL, USERS_LIST_REQUEST, USERS_LIST_SUCCESS, USERS_REMOVE_FAIL, USERS_REMOVE_REQUEST, USERS_REMOVE_SUCCESS } from "../constants/userConstants";


export const listOrders = () => async (dispatch , getState) =>{


    dispatch({type : ORDER_LIST_REQUEST });

    const {userSignin :{userInfo}} = getState();
    try {
        const authAxios =Axios.create({
            baseURL :"",
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
         })
        const {data} = await authAxios.post(`/api/admin/ordersList` );
        
        dispatch({type : ORDER_LIST_SUCCESS,  payload : data });

    } catch(error) {
        dispatch({type : ORDER_LIST_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }

}


export const listUsers = () => async (dispatch ,  getState) =>{


    dispatch({type : USERS_LIST_REQUEST });

    const {userSignin :{userInfo}} = getState();

    try {
        const authAxios =Axios.create({
            baseURL :"",
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
         })
        
        const {data} = await authAxios.post(`/api/admin/usersList`);
        
        dispatch({type : USERS_LIST_SUCCESS,  payload : data });

    } catch(error) {
        dispatch({type : USERS_LIST_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }

}



export const removeUsers = (userId) => async (dispatch ,  getState) =>{


    dispatch({type : USERS_REMOVE_REQUEST ,payload :userId});

    const {userSignin :{userInfo}} = getState();

    try {
        const authAxios =Axios.create({
            baseURL :"",    
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
         })
        
        const {data} = await authAxios.delete(`/api/admin/usersList/${userId}`);
        
        dispatch({type : USERS_REMOVE_SUCCESS,  payload : data });

    } catch(error) {
        dispatch({type : USERS_REMOVE_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }

}


export const userAdminInfo = () => async (dispatch ,  getState) =>{


    dispatch({type : USERS_ADMIN_REQUEST});

    const {userSignin :{userInfo}} = getState();

    try {
        const authAxios =Axios.create({
            baseURL :"",
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
         })
        
        const {data} = await authAxios.post(`/api/admin/userInfo`);
        
        dispatch({type : USERS_ADMIN_SUCCESS,  payload : data });

    } catch(error) {
        dispatch({type : USERS_ADMIN_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }

}


export const removeOrder = (orderId) => async (dispatch ,  getState) =>{

    try {

   

    
        
            dispatch({type : ORDER_REMOVE_REQUEST ,payload :orderId});

            const {userSignin :{userInfo}} = getState();

            const authAxios =Axios.create({
            baseURL :"",
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
         })
        
        const {data} = await authAxios.delete(`/api/admin/deleteOrder/${orderId}`);
        
        dispatch({type : ORDER_REMOVE_SUCCESS,  payload : data });
        

    } catch(error) {
        dispatch({type : ORDER_REMOVE_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }

}
export const adsAction = () => async (dispatch ,  getState) =>{

    try {
        dispatch({type : PRODUCT_ADS_REQUEST });

        const {data} = await Axios.get(`/api/admin/ads/serve`);
        
        dispatch({type : PRODUCT_ADS_SUCCESS,  payload : data });
        

    } catch(error) {
        dispatch({type : PRODUCT_ADS_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }

}



export const adsCreateAction = (formData) => async (dispatch ,  getState) =>{

    try {
        dispatch({type : PRODUCT_ADS_CREATE_REQUEST ,payload: formData});


        const {userSignin :{userInfo}} = getState();

            const authAxios =Axios.create({
            baseURL :"",
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
         })

        const {data} = await authAxios.post(`/api/admin/ads/create` , formData);
        
        dispatch({type : PRODUCT_ADS_CREATE_SUCCESS,  payload : data });
        

    } catch(error) {
        dispatch({type : PRODUCT_ADS_CREATE_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }

}


export const adsDeleteAction = (id) => async (dispatch ,  getState) =>{

    try {
        dispatch({type : PRODUCT_ADS_DELETE_REQUEST });


        const {userSignin :{userInfo}} = getState();

            const authAxios =Axios.create({
            baseURL :"",
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
         })

        const {data} = await authAxios.post(`/api/admin/ads/delete/${id}` );
        
        dispatch({type : PRODUCT_ADS_DELETE_SUCCESS,  payload : data });
        

    } catch(error) {
        dispatch({type : PRODUCT_ADS_DELETE_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }

}


