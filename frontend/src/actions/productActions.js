import Axios from "axios";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_SUCCESS , PRODUCT_DETAILS_REQUEST , PRODUCT_DETAILS_FAIL,
     PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_SAVE_SELLER_REQUEST, PRODUCT_SAVE_SELLER_SUCCESS, PRODUCT_SAVE_SELLER_FAIL, PRODUCT_LIKE_REQUEST, PRODUCT_LIKE_SUCCESS, PRODUCT_LIKE_FAIL, PRODUCT_IMAGE_REQUEST, PRODUCT_IMAGE_SUCCESS, PRODUCT_IMAGE_FAIL} from "../constants/constants"


const listProducts =(userInfo)=> async (dispatch) =>{

    try {
        dispatch({type:PRODUCT_LIST_REQUEST});
        
            const {data} = await Axios.get("/api/products/list");
    
            dispatch( {type: PRODUCT_LIST_SUCCESS , payload: data});
    

    
    }
    catch(error) {
        dispatch({type : PRODUCT_LIST_FAIL , payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

const saveProduct = (product , formData)=> async (dispatch , getState)=>{
    try {
        
        dispatch({type :PRODUCT_SAVE_REQUEST, payload :formData })
        const {userSignin :{userInfo}} = getState();
        
        
        if(!product._id){
            const {data} = await Axios.post("/api/Products/new/", formData, {
                headers : {
                    Authorization : `Bearer ${userInfo.token}`
                }
        },);
        dispatch({type :PRODUCT_SAVE_SUCCESS , payload: data})
        }
        
        else{
            console.log("edit actions");
        const {data} = await Axios.put(`/api/Products/${product._id}/edit`, product , {
            headers :{
            Authorization : `Bearer ${userInfo.token}` 
        },
    });
     dispatch({type :PRODUCT_SAVE_SUCCESS , payload: data})
        }
    } catch (error) {
        dispatch({type: PRODUCT_SAVE_FAIL , payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}




const deleteProduct =(productId) =>async (dispatch , getState) =>{
    try {
        const {userSignin :{userInfo}} = getState();

        dispatch({type: PRODUCT_DELETE_REQUEST,  payload : productId});
        const {data} =  await Axios.delete("/api/Products/"+ productId , {
            headers:{
                Authorization : 'Bearer '+ userInfo.token 
            }
        });
        dispatch({type : PRODUCT_DELETE_SUCCESS ,success: true, payload: data});

    } catch (error) {
        dispatch({type : PRODUCT_DELETE_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message});
   
    }
}
const detailsProduct =(productId ) =>async (dispatch) =>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST,  payload : productId});
        
        const {data} =  await Axios.get("/api/Products/"+ productId);

        dispatch({type : PRODUCT_DETAILS_SUCCESS , payload: data});

    } catch (error) {
        dispatch({type : PRODUCT_DETAILS_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message});    

    }
}

const likesProduct =(productId) =>async (dispatch ,getState) =>{
    try {
        dispatch({type: PRODUCT_LIKE_REQUEST,  payload : {productId : productId} });

        const {userSignin:{userInfo}}=getState();

        const {data} =  await Axios.put(`/api/Products/${productId}/likes`  ,productId, {
            headers :{
                Authorization : `Bearer ${userInfo.token}`
            }
        });



        dispatch({type : PRODUCT_LIKE_SUCCESS , payload: data});

    } catch (error) {
        dispatch({type : PRODUCT_LIKE_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message});    

    }
}




const sellerProducts = (id)=> async (dispatch , getState)=>{
    try {
        
        dispatch({type :PRODUCT_SAVE_SELLER_REQUEST})
        const {userSignin :{userInfo}} = getState();
   
        const authAxios =Axios.create({
            baseURL :"",
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
         })
        const {data} = await authAxios.post(`/api/Products/${id}/seller`);

        dispatch({type :PRODUCT_SAVE_SELLER_SUCCESS , payload: data})
        
        }
     catch (error) {
        dispatch({type: PRODUCT_SAVE_SELLER_FAIL , payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}



const imageProduct = (id)=> async (dispatch , getState)=>{
    try {
        
        dispatch({type :PRODUCT_IMAGE_REQUEST })

        const {userSignin :{userInfo}} = getState();
   
        const authAxios =Axios.create({
            baseURL :"",
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
         })
        const {data} = await authAxios.get(`/api/Products/image/${id}` , id);

        dispatch({type :PRODUCT_IMAGE_SUCCESS , payload: data})
        
        }
     catch (error) {
        dispatch({type: PRODUCT_IMAGE_FAIL , payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export {listProducts , detailsProduct ,saveProduct ,deleteProduct ,sellerProducts ,likesProduct , imageProduct};
