import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_IMAGE_REQUEST,
    PRODUCT_IMAGE_SUCCESS,
    PRODUCT_LIKE_FAIL,
    PRODUCT_LIKE_REQUEST,
    PRODUCT_LIKE_SUCCESS,
     PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
      PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SELLER_FAIL, PRODUCT_SAVE_SELLER_REQUEST, PRODUCT_SAVE_SELLER_SUCCESS, PRODUCT_SAVE_SUCCESS } from "../constants/constants";

function productListReducer( state={loading : true ,products:[]} , action){
    
    switch(action.type){

        case PRODUCT_LIST_REQUEST:
            return {loading : true , products :[] };
        case PRODUCT_LIST_SUCCESS:
            return {loading : false , products : action.payload};
        case PRODUCT_LIST_FAIL :
            return {loading :false , error : action.payload};
        default:
            return state;  
    
    }
}
function productDetailsReducer(state={product:{} , loading : true} , action){
    switch(action.type){

        case PRODUCT_DETAILS_REQUEST:
            return {loading : true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading : false,product: action.payload};
        case PRODUCT_DETAILS_FAIL :
            return {loading :false , error : action.payload};
        default:
            return state;
    
    }

}


function productLikesReducer(state={ loading : true} , action){
    switch(action.type){

        case PRODUCT_LIKE_REQUEST:
            return {loading : true};
        case PRODUCT_LIKE_SUCCESS:
            return {loading : false , Likes: action.payload};
        case PRODUCT_LIKE_FAIL :
            return {loading :false , error : action.payload};
        default:
            return state;
    
    }

}



function productSaveReducer(state={product:{}} , action){
    switch(action.type){

        case PRODUCT_SAVE_REQUEST:
            return {loading : true};
        case PRODUCT_SAVE_SUCCESS:
            return {loading : false, success:true ,product: action.payload};
        case PRODUCT_SAVE_FAIL :
            return {loading :false , error : action.payload};
        default:
            return state;
    
    }

}


function productDeleteReducer(state={product:{}} , action){
    switch(action.type){

        case PRODUCT_DELETE_REQUEST:
            return {loading : true};
        case PRODUCT_DELETE_SUCCESS:
            return {loading : false, success:true ,product: action.payload};
        case PRODUCT_DELETE_FAIL :
            return {loading :false , error : action.payload};
        default:
            return state;
    
    }

}


function sellerProductReducer(state={productsList:[] }, action){
    switch(action.type){

        case PRODUCT_SAVE_SELLER_REQUEST:
            return {loading : true , productsList :[]};
        case PRODUCT_SAVE_SELLER_SUCCESS:
            return {loading : false, success:true ,productsList: action.payload};
        case PRODUCT_SAVE_SELLER_FAIL :
            return {loading :false , error : action.payload};
        default:
            return state;
    
    }

}

function imageProductReducer(state={image:{}}, action){
    switch(action.type){

        case PRODUCT_IMAGE_REQUEST:
            return {loading : true , image:{}};
        case PRODUCT_IMAGE_SUCCESS:
            return {loading : false , image: action.payload };
        case PRODUCT_SAVE_SELLER_FAIL :
            return {loading :false , error : action.payload };
        default:
            return state;
    
    }

}

export {productListReducer , productDetailsReducer ,productSaveReducer ,productDeleteReducer , sellerProductReducer ,productLikesReducer ,imageProductReducer}