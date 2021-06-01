import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { imageProductReducer, productDeleteReducer, productDetailsReducer, productListReducer, productSaveReducer, sellerProductReducer } from './reducers/productReducers';
import { userDetailsReducer,  userProfileImageReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { userregisterReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers';
import { orderDeleteReducers, ordersListReducers, userInfoReducers, usersListReducers, usersRemoveReducers } from './reducers/adminReducers';



const cartItems=localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [];
const userInfo = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): null;
const shipping =localStorage.getItem('shipping')? JSON.parse(localStorage.getItem('shipping')): {} ;
const payment = localStorage.getItem('payment')? JSON.parse(localStorage.getItem("payment")):"RazorPay payment"
//const profileImage = localStorage.getItem('profileImage') && JSON.parse(localStorage.getItem("profileImage"))

//console.log("from store" + profileImage)

const initialState={
    cart : {cartItems ,shipping, payment}, userSignin: { userInfo }
};

const reducer =combineReducers({
    productList : productListReducer,
    productDetails :productDetailsReducer,
    cart : cartReducer,
    userSignin : userSigninReducer,
    userRegister : userregisterReducer,
    productSave :productSaveReducer,
    productDelete:productDeleteReducer,
    ordersList : ordersListReducers,
    orderCreate : orderCreateReducer,
    orderDetails :orderDetailsReducer,
    orderPay : orderPayReducer,
    orderMineList : orderMineListReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    usersList :usersListReducers,
    usersRemove : usersRemoveReducers,
    sellerProductsList :sellerProductReducer,
    userAdminDetailsInfo :userInfoReducers,
    orderRemove : orderDeleteReducers,
    productLike :productListReducer,
    productImage : imageProductReducer,
    profileImage : userProfileImageReducer,

})

const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose ;
const store = createStore(reducer , initialState, composeEnhansers(applyMiddleware(thunk)));

export default store;