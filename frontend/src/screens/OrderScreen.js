
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions.js';
import { ORDER_PAY_RESET } from '../constants/orderConstants.js';
import PlayLoad from '../components/PlayLoad.js';
import Axios from "axios";



function OrderScreen(props){

   const orderId =props.match.params.id;
    
   const orderDetails = useSelector(state => state.orderDetails);

   const { order ,loading , error} = orderDetails;

   const userSignin = useSelector(state => state.userSignin)

   const {userInfo} = userSignin;


   const orderPay = useSelector(state => state.orderPay);

   const {error :errorPay , success :successPayment , loading : loadingPay} = orderPay;

   

    const dispatch = useDispatch();

   
    useEffect(() => { 


        if(!order || successPayment){

          dispatch({type : ORDER_PAY_RESET });

           dispatch(detailsOrder(orderId));
           
        }
      
    }, [dispatch, order, orderId, successPayment]);

    function image(product){
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(product.image.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }


    function loadScript(src){
        return new Promise((resolve)=>{
            const script = document.createElement('script')
            script.src = src
            document.body.appendChild(script) 
            script.onload =()=>{
                resolve(true)
            }
            script.onerror=()=>{
                resolve(false)
            }
            
        })
       
    }



     async function displayHandler(){
        
        const res =  await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if(!res){
            alert("are you online...??")
        }
        const key_id='rzp_test_4wdLrJPfx6m2NE'

        //const data = await fetch(`http://localhost:5000/api/razorpay/order/${orderId}`,{ method :'GET' }).then((t)=>t.json())
        

        const {data} = await Axios.get(`/api/razorpay/order/${orderId}`)




        const options = {
            "key":key_id, // Enter the Key ID generated from the Dashboard
            "amount":data.amount*100, //(data.ammount*100).toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": data.currency,
            "name": userInfo.name,
            "order_id": (data.id), //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                            
            dispatch(payOrder(order , response))
                },
            "prefill": {
                "name": userInfo.name,
                "email": userInfo.email
            },
            
            "theme": {
                "color": "#70cd9e"
            }
        };
      
        var rzp1 = new window.Razorpay(options); 
        rzp1.on('payment.failed', function (response){
            
           /* alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);*/
            <MessageBox varient="danger">{response.error.description} </MessageBox>
           
    }); 
    rzp1.open()
    
    }
     
    
    

    return loading?<LoadingBox></LoadingBox>:
    error ?<MessageBox varient="danger" >{error} </MessageBox>:
    successPayment?<MessageBox varient="success">payment is done ,you will get message soon. (if mobile number updated)</MessageBox>:
    errorPay ?<MessageBox varient="danger" >{errorPay.message} </MessageBox> :

    (
        
    <div className="order-id">  
        <h1>Order :<span > {order._id}</span> </h1>
    <div className="placeorder">
    <div className="placeorder-list">
        <div  className="placeorder-info">
                
        
            <div className="addess-div">
                <h3>Shipping</h3>
               
                    <p>
                        <strong>Name: </strong>{order.shipping.fullname},
                    </p>
               
                    <p>
                        <strong>Address: </strong>
                        {order.shipping.address},
                        {order.shipping.city}, 
                        {order.shipping.postalCode},  
                        <b>{order.shipping.country}</b>
                    
                    </p>
                    
                        <b>Status :</b>{order.isDelivered ? 
                            <MessageBox varient="success">deliveredAt {order.deliveredAt}</MessageBox>
                        :
                            <MessageBox varient="danger">Not delivered</MessageBox>
                        }
                    

               
               
              
            </div>
        </div>
        <div className="placeorder-info">
            <h3>Payment</h3>
            <div>
                Payment Method :<b>{order.payment}</b>
            </div>
            <div>
            <b>Status :</b>{order.isPaid ? 
                        <MessageBox varient="success"  style={{textDecoration: "underline"}} > Paid At :<text style={{color: "#6c0379"}}>    
                        Date : {order.paidAt.substring(0 ,10)}  , Time : {order.paidAt.substring(11, 19)}</text> </MessageBox>
                        :
                        <MessageBox varient="danger"> Not paid</MessageBox>
                        }
            </div>
        
        </div>
        <div>
                
        </div>
        <div className="placeorder-info">
        <ul className="placeorder-list-container">
            <li kay="1234">
                <h4 id="placeorder-h4">

                    Ordered items

                </h4>
                <h4>
                    Quantity
                </h4>  
            
                <h4>
                    Price
                </h4>
                <h4>
                    SubTotal
                </h4>
            
            
                
            </li>
      
                {
                   
                    
                    order.orderItems.map(item=> 
                    <li  key={item.id}>
                            <div className="placeorder-image">
                                <img src={`data:${item.image.contentType};base64,${image(item)}`}  alt={`${item._id}`}/>
                            </div>
                            <div className="placeorder-name" >
                                    <div>
                                    Name :
                                        <Link to={ "/product/"+item.product }>
                                             {item.name}
                                        </Link>
                                    
                                    </div>
                                    
                                    
                                        
                                    
                            </div>
                            <div className="placeorder-qty">
                                    {item.qty}
                            </div>
                               
                            <div className="placeorder-price">
                                 &#8377; {item.price}
                            </div>
                            <div className="placeorder-subtotal">
                                {item.qty} * &#8377; {item.price}= {item.price*item.qty}
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
                
                <div>&#8377;{order.itemsPrice.toFixed(2)}</div>
                
            </li>
            <li>
                <div>Shipping</div>
                
                <div>&#8377;{order.shippingPrice.toFixed(2)}</div>
                
            </li>
            <li>
                <div>Tax</div>
                
                <div>&#8377;{order.taxPrice.toFixed(2)}</div>
                
            </li>
            <li>
                __________________________________________________
            </li>
            <li>
                <div>Order-Total</div>
                
                <div>&#8377;{order.totalPrice.toFixed(2)}</div>
                
            </li>
           {  
                    <li  className="pay-button">

                     {order.isPaid ?  
                            <button className="button"  style={{backgroundColor : "#5faa43e0" , letterSpacing : 5, fontSize : 20 , color:"#94f040" ,cursor: "revert" , boxShadow:"unset"}} disabled>
                                PAID
                            </button>:(
                                
                                      
                                    successPayment?
                                        
                                            <button className="button"  style={{backgroundColor : "green"}} disabled>
                                                Paid
                                            </button>
                                        
                                        :

                                         
                                        <button  type="button"   className="button"  onClick={(e)=>{
                                            
                                                displayHandler()
                                                
                                                e.preventDefault();
                                            }}
                                        disabled={successPayment?true : false}
                                        
                                        >
                                        {loadingPay?<PlayLoad></PlayLoad> : successPayment ?"PAID":"PAY NOW"}

                                        </button>
                                        
                                      
                                )
                                
                                       
                     }
                    </li>
                }
               
        </ul>
    </div>
        
   </div>
</div>
 
    )
}

export default OrderScreen;