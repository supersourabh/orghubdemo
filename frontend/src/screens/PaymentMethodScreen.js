import React, { useState  } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import { CheckoutSteps } from '../components/CheckoutSteps';


function PaymentMethodScreen(props){

    const cart = useSelector(state => state.cart)
    const {shipping} =cart;

    if(!shipping) {
        props.history.push("/shipping")
    }


    const  [payment, setPayment] = useState('RazorPay Payment');
    
   
    const dispatch = useDispatch();

    const submitHandler =(e) =>{

        e.preventDefault();


        dispatch(savePayment(payment));

        props.history.push(`/placeOrder`)
    }
  
    
  
    return  <div >
        <CheckoutSteps step1 step2 step3>  </CheckoutSteps>
        <div className='form'>
        <form onSubmit={submitHandler} className="paymentMethod">
                <div>

                     <h2>
                       Payment
                    </h2>
               
                </div>
                    <div id='paymentDiv'>
                            <input required checked type="radio" name="paymentMethod" id="paymentMethod" value="razorPay" onChange={(e) =>setPayment(e.target.value)}>

                            </input>
                            
                            <label htmlFor="paymentMethod">
                                All payments accepted !
                            </label>
                    </div>
            
                   {/*<div id='paymentDiv'> 
                      
                        <input required  disabled type="radio" name="paymentMethod" id="paymentMethod" value="PhonePay      " onChange={(e) =>setPayment(e.target.value)}>
                                
                        </input>
                        <label htmlFor="paymentMethod">
                            PhonePay
                        </label>
                   </div>
                   */}
                   
                   
                    
            
                
               
                    <button type="submit" className="button" >Continue</button>

               
               
               
        
        </form>
    </div>
   </div>
    }

    export default PaymentMethodScreen;