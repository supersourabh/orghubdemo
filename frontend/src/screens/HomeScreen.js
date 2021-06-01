import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox.js';
import { listProducts } from '../actions/productActions';
import MessageBox from '../components/MessageBox';
import Products from '../components/products';

function HomeScreen(props){


  
  const productList = useSelector(state => state.productList);
  const {products ,loading , error} = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());

    
  },[dispatch])


  return loading? 
       <LoadingBox>  </LoadingBox> :
         error?
      <MessageBox  varient="danger">
        {error}
      </MessageBox> :
   <ul className  ="products">
   {  products.length===0 && <div class="noOrders"  style={{backgroundColor : "#e29797" ,borderRadius : 10}}> <h2 id="noOrders">No Products Available..!</h2></div>}
    {
       products.map( product =>
      <li key={product._id} > 
        <Products product={product} />
      </li>
    )
  }
    
  </ul> 
}
export default HomeScreen ;