import React, { useState,useEffect  } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {signin} from '../actions/userActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import bcrypt from 'bcryptjs';


function SigninScreen(props){

    const  [email, setEmail] = useState('');
    const [password ,setPassword] = useState('');
    
    const userSignin = useSelector(state=>state.userSignin);
    const {loading,error,userInfo}=userSignin;

    const redirect =props.location.search ? props.location.search.split("=")[1]:"/"; 

    const dispatch = useDispatch();
   
        
  
    useEffect(() => {
      if (userInfo) {
          props.history.push(redirect);
      } 

      return () => {
        //
      };
    },[props.history, redirect, userInfo])

    const submitHandler =(e) =>{
        e.preventDefault();
        const passwordModefied= bcrypt.hashSync(password)
        dispatch(signin(email ,passwordModefied));
    }
  
    
  
    return  <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>
                        LOGIN
                    </h2>
                </li>
                <li>
                    {loading&&<LoadingBox></LoadingBox>}
                    {error && <MessageBox varient="danger" >{error}</MessageBox>}
                </li>
                <li className="email">
                    <label htmlFor="email">
                        Email
                    </label>
                   
                    <input  required  autoFocus placeholder="example@mail.com" type="email" name="email" id="email" onChange={(e) =>setEmail(e.target.value)}>

                    </input>
                </li>
                <li>
                    <label htmlFor="password">
                    Password
                    </label>
                    <input required  placeholder="Enter password here" type="password" name="password" id="password" onChange={(e) =>setPassword(e.target.value)}>
                    
                    </input>
                    
                    
                </li>
                <li>
                    <label/>
                    <button type="submit" className="button" >Login</button>

                </li>
                New to OrgHub ?   
                Ooops...
                <li className="specialchild">
                    <Link to={"/register?redirect="+ redirect} >Create OrgHub account here</Link>
                </li>


            </ul>
        </form>
    </div>
    }

    export default SigninScreen;