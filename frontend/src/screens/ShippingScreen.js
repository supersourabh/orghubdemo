import React, { useState  } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import { CheckoutSteps } from '../components/CheckoutSteps';


function ShippingScreen(props){



    const userSignin = useSelector(state => state.userSignin);

    const { userInfo } = userSignin; 

    const cart = useSelector(state => state.cart)

    const {shipping} = cart;

    if (!userInfo){
        props.history.push("/signin");
    }
    
    const [fullname, setFullname] = useState(shipping? shipping.fullname : "");
    const  [address, setAddress] = useState(shipping && shipping.address);
    const  [city, setCity] = useState(shipping && shipping.city);
    const [postalCode ,setPostalCode] = useState(shipping &&shipping.postalCode);
    const  [country, setCountry] = useState(shipping && shipping.country);
   
    const dispatch = useDispatch();
    
   
        
  
   

    const submitHandler =(e) =>{
        e.preventDefault();
        
        dispatch(saveShipping({fullname , address ,city ,postalCode , country}));
        props.history.push("/payment")
    }
  
    
  
    return  <div >
        <CheckoutSteps step1 step2 >  </CheckoutSteps>
    <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>
                       Shipping
                    </h2>
                </li>
               
                <li>
                    <label htmlFor="Fullname">
                        Full name
                    </label>

                    <input placeholder="Enter full name" required value={fullname}  type="text" name="Fullname" id="Fullname" onChange={(e) =>setFullname(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="address">
                        Address
                    </label>
                    <input  placeholder="Enter Address" required  value={address} type="text" name="address" id="address" onChange={(e) =>setAddress(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="city">
                        City
                    </label>
                    <input  placeholder="Enter city"  required type="text" value={city}  name="city" id="city" onChange={(e) =>setCity(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="postalCode">
                        Postal Code
                    </label>
                    <input  placeholder="Postal code"  required value={postalCode} type="text" name="postalCode" id="postalCode" onChange={(e) =>setPostalCode(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="country">
                        Country
                    </label>
                    <input  placeholder="Country"  required  value={country} type="text" name="country" id="country" onChange={(e) =>setCountry(e.target.value)}>

                    </input>
                </li>

                
                <li>
                    <button type="submit" className="button" >Continue</button>

                </li>
               
               
            </ul>
        </form>
    </div>
   </div>
    }

    export default ShippingScreen;