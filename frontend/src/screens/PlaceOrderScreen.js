import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { CheckoutSteps } from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import PlayLoad from '../components/PlayLoad.js';


function PlaceOrderScreen(props){

    const cart = useSelector(state=>state.cart);

    

    if(!cart.shipping){
        props.history.push("/shipping");
    }
    if(cart.cartItems.length===0){
        props.history.push("/");
    }
   
    
     if(!cart.payment){
        props.history.push("/payment");
    }
  

    const orderCreate = useSelector(state => state.orderCreate)

    const { loading , success , error , order } = orderCreate;



   const toPrice = (num) =>Number(num.toFixed(2));

    cart.itemsPrice =toPrice(
        cart.cartItems.reduce((a ,c)=>a + c.price*c.qty ,0)
    );

    cart.shippingPrice = cart.cartItems===0 ? 0 : cart.itemsPrice>100 ? toPrice(40): toPrice(0);

    cart.taxPrice =toPrice(0.18*cart.itemsPrice);

    cart.totalPrice =toPrice(cart.itemsPrice +cart.shippingPrice + cart.taxPrice);

    

    const dispatch = useDispatch();


    const placeOrderHandler =()=>{
        console.log(cart);

       dispatch(createOrder({...cart ,orderItems: cart.cartItems})) 
       console.log(cart);

    }
   
 
    useEffect(() => { 
       if (success){
          

           props.history.push(`/orders/${order._id}`)

          dispatch({type : ORDER_CREATE_RESET})
       }
    }, [dispatch, order, props.history, success])
  


    function image(product){
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(product.image.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }


    return <div>
    <CheckoutSteps step1 step2 step3 step4> </CheckoutSteps>
    <div className="placeorder">
    <div className="placeorder-list">
        <div className="placeorder-info">
                
        
            <div className="addess-div">
                <h3>Shipping</h3>
               
                    <p>
                        <strong>Name: </strong>{cart.shipping.fullname},
                    </p>
               
                    <p>
                        <strong>Address: </strong>
                        {cart.shipping.address},
                        {cart.shipping.city}, 
                        {cart.shipping.postalCode},  
                        <b>{cart.shipping.country}</b>
                    
                    </p>
                 
               
               
              
            </div>
        </div>
        <div className="placeorder-info">
            <h3>Payment</h3>
            <div>
                Payment Method :<b>{cart.payment}</b>   
            </div>
        
        </div>
        <div>
                
        </div>
        <div className="placeorder-info">
        <ul className="placeorder-list-container">
            <li >
                <h4 id="placeorder-h4">

                   Shopping Cart

                </h4>
                <h4>
                    Quantity(in kg)
                </h4>
            
                <h4>
                    Price/kg
                </h4>
                <h4>
                    SubTotal
                </h4>
            
            
                
            </li>
      
                {
                    cart.cartItems.length === 0 ?

                    <div className="empty-cart">
                        
                        Cart is empty
    
                    </div>
                   :
                    cart.cartItems.map(item=>

                    <li key={item._id}>
                            <div className="placeorder-image">
                                <img src={`data:${item.image.contentType};base64,${image(item)}`} alt="product"/>
                            </div>
                            <div className="placeorder-name" >
                                    <div>
                                    Name :
                                        <Link to={ "/Products/"+item.product }>
                                             {item.name}
                                        </Link>
                                    
                                    </div>
                                 
                            </div>
                            
                            <div className="placeorder-qty">
                                    {item.qty}
                            </div>
                               
                            <div className="placeorder-price">
                                &#8377; { item.price}
                            </div>
                            <div className="placeorder-subtotal">
                                &#8377;{ item.price*item.qty}
                            </div>
                        
                        </li>)
                    
                }
          
        </ul> 
        </div>
    </div>
    <div className="placeorder-action">

      
        <ul>
           
            <li>
               <h3> Order Summary :</h3>
            </li>
            
            <li>
                <div>Items</div>
                
                <div>&#8377;{cart.itemsPrice.toFixed(2)}</div>
                
            </li>
            <li>
                <div>Shipping</div>
                
                <div>&#8377;{cart.shippingPrice.toFixed(2)}</div>
                
            </li>
            <li>
                <div>Tax</div>
                
                <div>&#8377;{cart.taxPrice.toFixed(2)}</div>
                
            </li>
            <li>
                ________________________________________________
            </li>
            <li>
                <div>Order-Total</div>
                
                <div>&#8377;{cart.totalPrice.toFixed(2)}</div>
                
            </li>
            <li>
                <button onClick={placeOrderHandler} disabled={cart.cartItems.length===0} className ="button" id="placeorder-button">{loading ?<PlayLoad></PlayLoad> : "Place-Order"}</button>
            </li>
            <li>
                {
                    loading && <LoadingBox height="20" ></LoadingBox>
                }
                {
                    error && <MessageBox varient = "danger">{ error } </MessageBox>
                }
            </li>

        </ul>
    </div>
        
   </div>
</div>
}

export default PlaceOrderScreen;