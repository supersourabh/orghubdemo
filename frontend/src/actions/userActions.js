import Axios from 'axios';
import { USER_DETAILS_FAIL, 
    USER_DETAILS_REQUEST, 
    USER_DETAILS_SUCCESS, 
    USER_DETAILS_UPDATE_REQUEST,
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_SIGNIN_FAIL, 
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS, 
    USER_SIGN_OUT ,
    USER_DETAILS_UPDATE_SUCCESS,
    USER_DETAILS_UPDATE_FAIL,
    USER_IMAGE_REQUEST,
    USER_IMAGE_SUCCESS,
    USER_IMAGE_FAIL
} from '../constants/userConstants';

const signin = (email , password) => async (dispatch)=>{
    dispatch({type: USER_SIGNIN_REQUEST , payload :{email ,password}})

    try {
        const {data}  = await Axios.post("/api/users/signin" ,{email, password})
        
        dispatch({type : USER_SIGNIN_SUCCESS , payload : data });
        
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {

        dispatch({type : USER_SIGNIN_FAIL ,payload : error.response && error.response.data.message ? error.response.data.message : error.message})
      
    }

}


const signout =() => async (dispatch)=>{
    
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shipping');
   
   
    dispatch({type :USER_SIGN_OUT})
}


const register = (name ,email , password) => async (dispatch)=>{
    dispatch({type: USER_REGISTER_REQUEST , payload :{name, email ,password}})

    try {
        const {data } = await Axios.post("/api/users/register" ,{name, email, password})
        
        dispatch({type : USER_REGISTER_SUCCESS ,payload : data });
        dispatch({type : USER_SIGNIN_SUCCESS ,payload : data });
      
         localStorage.setItem("userInfo ", JSON.stringify(data));

    } catch (error) {

        dispatch({type : USER_REGISTER_FAIL ,payload : error.response && error.response.data.message ? error.response.data.message : error.message})
      
    }

}

const detailsUser = (userId) => async (dispatch , getState)=>{

    dispatch({type: USER_DETAILS_REQUEST , payload : userId})

    const {userSignin: {userInfo}} = getState();

    try {
        const {data } = await Axios.get(`/api/users/${userId}` ,{ 
            headers :{
                 Authorization : `Bearer ${userInfo.token}`
            }
               
        });
        
        dispatch({type : USER_DETAILS_SUCCESS ,payload : data })

        localStorage.setItem("userInfo", JSON.stringify(data));


    } catch (error) {

        dispatch({type : USER_DETAILS_FAIL ,payload : error.response && error.response.data.message ? error.response.data.message : error.message})
      
    }

}


const updateUserProfile = (user , formData) => async (dispatch , getState)=>{

    dispatch({type: USER_DETAILS_UPDATE_REQUEST , payload : formData , user})

    const {userSignin: {userInfo}} = getState();

    try {
        const authAxios =Axios.create({
            baseURL :"",    
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
         })
        const {data } = await authAxios.put('/api/users/profile' ,formData , user );
        
        dispatch({type : USER_DETAILS_UPDATE_SUCCESS ,payload : data })

        dispatch({type : USER_SIGNIN_SUCCESS ,payload : data});

        localStorage.setItem("userInfo" , JSON.stringify(data));


    } catch (error) {

        dispatch({type : USER_DETAILS_UPDATE_FAIL ,payload : error.response && error.response.data.message ? error.response.data.message : error.message})
      
    }

}

const imageUser = (user)=> async (dispatch , getState)=>{
    try {
        
        dispatch({type :USER_IMAGE_REQUEST , payload : user._id})
        
        const {userSignin :{userInfo}} = getState();
   
        const authAxios =Axios.create({
            baseURL :"",
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
         })
        const data = await authAxios.get(`/api/users/image/${user._id}`);

        console.log(data);

        dispatch({type :USER_IMAGE_SUCCESS , payload: data})
         return data
        
        }
     catch (error) {
        dispatch({type: USER_IMAGE_FAIL , payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}




export { signin , signout, register ,  detailsUser , updateUserProfile , imageUser};