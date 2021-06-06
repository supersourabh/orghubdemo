import { ORDER_REMOVE_FAIL, ORDER_REMOVE_REQUEST, ORDER_REMOVE_SUCCESS, PRODUCT_ADS_CREATE_FAIL, PRODUCT_ADS_CREATE_REQUEST, PRODUCT_ADS_CREATE_SUCCESS, PRODUCT_ADS_DELETE_FAIL, PRODUCT_ADS_DELETE_REQUEST, PRODUCT_ADS_DELETE_SUCCESS, PRODUCT_ADS_FAIL, PRODUCT_ADS_REQUEST, PRODUCT_ADS_SUCCESS, USERS_ADMIN_FAIL, USERS_ADMIN_REQUEST, USERS_ADMIN_SUCCESS } from "../constants/adminConstants";
import { ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstants";
import { USERS_LIST_FAIL, USERS_LIST_REQUEST, USERS_LIST_SUCCESS, USERS_REMOVE_FAIL, USERS_REMOVE_REQUEST, USERS_REMOVE_SUCCESS } from "../constants/userConstants";

export const ordersListReducers = (state={ orders: [] }, action)=>{
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading :true};
        
        case ORDER_LIST_SUCCESS:
            return { loading :false , orders : action.payload};

        case ORDER_LIST_FAIL:
            return { loading :false ,  error :action.payload};

        
        default:
            return state;
    }
}



export const usersListReducers = (state={users:[] }, action)=>{
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return { loading :true };
        
        case USERS_LIST_SUCCESS:
            return { loading :false , users : action.payload};

        case USERS_LIST_FAIL:
            return { loading :false ,  error :action.payload};

        
        default:
            return state;
    }
}
export const usersRemoveReducers = (state={user :{}}, action)=>{
    switch (action.type) {
        case USERS_REMOVE_REQUEST:
            return { loading :true };
        
        case USERS_REMOVE_SUCCESS:
            return { loading :false , success:true , user: action.payload};

        case USERS_REMOVE_FAIL:
            return { loading :false ,  error :action.payload};

        default:
            return state;
    }
}

export const userInfoReducers = (state={userInfo:[]}, action)=>{
    switch (action.type) {
        case USERS_ADMIN_REQUEST:
            return { loading :true, userInfo:[] };
        
        case USERS_ADMIN_SUCCESS:
            return { loading :false , userInfo: action.payload};

        case USERS_ADMIN_FAIL:
            return { loading :false ,  error :action.payload};

        default:
            return state;
    }
}


export const orderDeleteReducers = (state={}, action)=>{
    switch (action.type) {
        case ORDER_REMOVE_REQUEST:
            return { loading :true };
        
        case ORDER_REMOVE_SUCCESS:
            return { loading :false , success :true};

        case ORDER_REMOVE_FAIL:
            return { loading :false ,  error :action.payload};

        default:
            return state;
    }
}

export const adsReducers = (state={loading : true ,adsProducts:[]}, action)=>{
    switch (action.type) {
        case PRODUCT_ADS_REQUEST:
            return { loading :true ,adsProducts:[]};
        
        case PRODUCT_ADS_SUCCESS:
            return { loading :false , success :true , adsProducts : action.payload};

        case PRODUCT_ADS_FAIL:
            return { loading :false ,  error :action.payload};

        default:
            return state;
    }
}

export const adsCreateReducers = (state={}, action)=>{
    switch (action.type) {
        case PRODUCT_ADS_CREATE_REQUEST:
            return { loading :true };
        
        case PRODUCT_ADS_CREATE_SUCCESS:
            return { loading :false , success :true };

        case PRODUCT_ADS_CREATE_FAIL:
            return { loading :false ,  error :action.payload};

        default:
            return state;
    }
}

export const adsDeleteReducers = (state={loading:true}, action)=>{
    switch (action.type) {
        case PRODUCT_ADS_DELETE_REQUEST:
            return { loading :true };
        
        case PRODUCT_ADS_DELETE_SUCCESS:
            return { loading :false , success :true };

        case PRODUCT_ADS_DELETE_FAIL:
            return { loading :false ,  error :action.payload};

        default:
            return state;
    }
}

