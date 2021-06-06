import React, { useEffect, useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import { USER_DETAILS_UPDATE_RESET } from '../constants/userConstants';


export default function ProfileScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [changePassword, setChangePassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState('')

    const userSignin = useSelector((state) => state.userSignin)

    const {userInfo} = userSignin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);

    const  { loading: loadingUpdate , error: errorUpdate , success:successUpdate  }= userUpdateProfile;
    
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails); 

    const {loading ,error , user} = userDetails;

    const [seller, setSeller] = useState(userInfo.seller);
    


    useEffect(() => {
        if(!user){
            dispatch({type : USER_DETAILS_UPDATE_RESET})
            dispatch(detailsUser(userInfo._id));
        }else{
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPhoneNumber(userInfo.phoneNumber);
            setSeller(userInfo.seller);
        }

        setChangePassword(false)

       
    
    }, [dispatch, userInfo._id, user, userInfo.name, userInfo.email, successUpdate, userInfo.phoneNumber, userInfo.seller])

   
      
      

    const changeUserPassword =()=>{
        
        setChangePassword(true)

    }
    const notChangePassword =()=>{
        
        setChangePassword(false)

    }

    const submitHandler=(e)=>{
        e.preventDefault();

        if(password !== conformPassword){
            alert("password does't matched !!!")
        }else{
            const formData = new FormData()
            formData.append("profileImage" , profileImage)
            formData.append("name" , name)
            formData.append("userId" , user._id)
            formData.append("email" , email)
            formData.append("password" , password)
            formData.append("seller" , seller)
            formData.append("phoneNumber" , phoneNumber)

            dispatch(updateUserProfile({
                userId : user._id,
                name,
                email,
                password,
                seller,
                profileImage,
                phoneNumber
            },formData));
        }
    }


    return (
        <div className="form-profile">
            <form  onSubmit={submitHandler} method="POST" encType ="multipart/form-data">
                <div>
                    <h1 style={{textAlign:"center"}}>User Profile</h1>
                </div>
                {
                    loading ?<div><LoadingBox/></div>:

                    error ? <MessageBox varient ="danger">{error}</MessageBox> :<>
                    <div style={{width : 475 ,overflow :"hidden",borderRadius: 50}}>
                      
                        {
                            loadingUpdate && <LoadingBox/>
                        }
                        {
                            errorUpdate && <MessageBox varient="danger" >{errorUpdate}</MessageBox> 
                        }
                       
                        {
                            successUpdate && <MessageBox varient="success">Profile Updated Successfully ...</MessageBox>
                        }
                    </div> 

                        <div>
                            <lable htmlFor="name"> Name</lable>
                            <input id="name" type ="text" onChange={(e)=>setName(e.target.value)}  placeholder="Enter name"
                                value ={name}></input>
                        </div>

                        <div>
                            <lable htmlFor="email"> Email</lable>
                            <input id="email" type ="text" onChange={(e)=>setEmail(e.target.value)}placeholder="Enter email"
                                value ={email}></input>
                        </div>
                        <div>
                            <lable htmlFor="profile"> Profile-Image (upto 500kb)</lable>
                            <input id="profile"  type ="file" name="profileImage" accept="images" onChange={(e)=>setProfileImage(e.target.files[0])} ></input>
                        </div>
                        <div>
                            <lable htmlFor="phoneNumber"> Phone-Number(only numbers)</lable>
                            <input id="phoneNumber"  required type ="text" maxLength='10' minLength='10' placeholder="Enter phone number" pattern="[0-9]{10}"  name="phoneNumber"  onChange={(e)=>setPhoneNumber(e.target.value)} ></input>
                        </div>


                        <div>
                            <lable htmlFor="seller"> Are you seller</lable>
                            <select value={seller}  onChange ={(e)=>{setSeller(e.target.value)} }>
                                    <option value="false">NO</option>
                                    <option value="true">YES</option>
                            </select>
                            
                        </div>


                        {changePassword ?
                        <div>
                            <button type='button' className="button" id="changePassword" onClick={notChangePassword}>not change password </button>
                        </div>
                        :
                        <div>
                            <button type='button' className='button' id="changePassword"  onClick={changeUserPassword}>Change-password</button>
                        </div>
                        }
                        { changePassword?
                        <div>
                            <lable htmlFor="password"> Password</lable>
                            <input  id="password" type ="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password">

                            </input>
                        </div>:''
                        }
                       
                        { changePassword ?
                            <div>
                            <lable htmlFor="conformPassword"> Conform-Password</lable>
                            <input  id="conformPassword" type ="text" onChange={(e)=>setConformPassword(e.target.value)}placeholder="Conform Password"
                               ></input>
                        </div>:''
                        }
                        
                        
                        
                        
                     
                        
                        <div className="buttondiv">
                            <button type="submit" className="button" >Update</button>
                        </div>


                    </>

                }

            </form>
        </div>
    )
}
