import React, { useState,useEffect  } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions'
import bcrypt from 'bcryptjs';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



function RegisterScreen(props){

    const  [name, setName] = useState('');
    const  [email, setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const  [repassword, setRepassword] = useState('');
    const userRegister = useSelector(state=>state.userRegister);
    const {userInfo,loading,error}=userRegister;
    const dispatch = useDispatch();
    const redirect =props.location.search ? props.location.search.split("=")[1]:"/"; 
   


  
    useEffect(() => {
      if (userInfo) {
          props.history.push(redirect);
      } 
      
      return () => {
        //
      };
    },[dispatch, email, name, password, props.history, redirect, userInfo])

    const submitHandler =(e) =>{

        e.preventDefault();

        if(bcrypt.compareSync( password ,repassword)){
            alert("Password does't matched..!!")
        }else{
            dispatch(register(name ,email ,password));
        }
        
          
        
        
    }
  
    
  
    return  <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>
                        CREATE ORGHUB ACCOUNT
                    </h2>
                </li>
                <li>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox varient="danger" >{error}</MessageBox>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input  autoFocus required placeholder='Enter name' type="name" name="name" id="name" onChange={(e) =>setName(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input required placeholder='example@mail.com' type="email" name="email" id="email" onChange={(e) =>setEmail(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="password">
                    Password
                    </label>
                    <input required   placeholder='Password' type="password" name="password" id="password" onChange={(e) =>setPassword(bcrypt.hashSync(e.target.value))}>
                        
                    </input>
                </li>
                <li>
                    <label htmlFor="conformPassword">
                    Re-Enter-password
                    </label>
                    <input required placeholder='Re-password' type="text" name="repassword" id="repassword" onChange={(e) =>setRepassword(e.target.value)}>
                        
                    </input>
                </li>
                <li>
                    <button type="submit" className="button" >Register</button>

                </li>
                Already have an account..
                <li className="specialchild">
                <Link to={redirect === "/"? "signin ":"redirect?"+ redirect} >login</Link>
                </li>


            </ul>
        </form>
    </div>
    }

    export default RegisterScreen;