import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { listUsers, removeUsers } from '../actions/adminActions.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import Delete from '../icons/Delete.js';

export default function UsersListScreen(props) {

    const usersList = useSelector(state => state.usersList);

    const {loading , error , users } = usersList;

    const usersRemove = useSelector(state => state.usersRemove)

    const {loading:loadingDelete ,success:successDelete , error:errorDelete } =usersRemove;


    const dispatch = useDispatch();

    
    useEffect(() => {
        
             dispatch(listUsers());
        
    }, [dispatch , successDelete])

    const deleteUser=(user)=>{

        dispatch(removeUsers(user._id));
    }


    function imageSrc(user){
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(user.profileImage.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }


    return (
        <div className="usersList">
            <h1> Users</h1>
            {
                loading ? <LoadingBox></LoadingBox>
            :
            error || errorDelete? <MessageBox varient="danger" >{error}</MessageBox>
            :
            <div className="users">
                {

                    users.map(user =>(
                        user.isAdmin &&(
                        <div key={user._id} className="user">
                            <div className='name'>

                                <div>
                                    <h4>NAME :</h4>  <b id="nameBold">{user.name}</b>
                                </div>
                                <div>
                                     <h4>ID :</h4>  <b>{user._id}</b>
                                </div>
                                <div>
                                    <h4>JOINED_AT:</h4> <b>{user.createdAt.substring(0 ,10)}</b>
                                </div>
                               

                            </div>
                            <div className="user-details">
                                <div className="info">
                                        <h4>EMAIL :</h4> <b>{user.email}</b>
                                       
                                </div>
                                <div className="admin">
                                        <h4>ADMIN :</h4> {user.isAdmin? <b>&#x2705;</b>: <b> ❌</b>}
                                </div>
                                <div className="seller">
                                        <h4>SELLER :</h4> {user.seller?<b>&#x2705;</b>:<b>❌</b>}
                                </div>
                                <div>
                                        <h4>PHONE :</h4> {user.phoneNumber?user.phoneNumber : "Unavailable"}
                                </div>
                               
                            </div>
                            <div className="userImage">
                                <div className='imageBox'>
                                    <div className="imgBoxInner" >

                                        <img src={`data:${user.profileImage.contentType};base64,${imageSrc(user)}`} alt={user._id}/>

                                    </div>
                                </div>
                                <div className="buttons">
                                    <button type="button" className ="button"  style={{width: 100}} onClick={()=>deleteUser(user)}><Delete/></button>
                                </div>
                            </div>
                        </div>
                    )))
                }
                {
                    users.map(user =>(
                        user.isAdmin ? "" :(
                        <div key={user._id} className="user">
                            <div className='name'>

                                <div>
                                    <h4>NAME :</h4>  <b id="nameBold">{user.name}</b>
                                </div>
                                <div>
                                     <h4>ID :</h4>  <b>{user._id}</b>
                                </div>
                                <div>
                                    <h4>JOINED_AT:</h4> <b>{user.createdAt.substring(0 ,10)}</b>
                                </div>
                               

                            </div>
                            <div className="user-details">
                                <div className="info">
                                        <h4>EMAIL :</h4> <b>{user.email}</b>
                                       
                                </div>
                                <div>
                                        <h4>ADMIN :</h4> {user.isAdmin? <b>&#x2705;</b>: <b> ❌</b>}
                                </div>
                                <div >
                                        <h4>SELLER :</h4> {user.seller?<b>&#x2705;</b>:<b>❌</b>}
                                </div>
                                <div>
                                        <h4>PHONE :</h4> {user.phoneNumber?user.phoneNumber : "Unavailable"}
                                </div>
                               
                            </div>
                            <div className="userImage">
                                <div className='imageBox'>
                                    <div className="imgBoxInner" >

                                        <img src={`data:${user.profileImage.contentType};base64,${imageSrc(user)}`} alt={user._id}/>

                                    </div>
                                </div>
                                <div className="buttons">
                                    <button type="button" className ="button"  style={{width: 100}} onClick={()=>deleteUser(user)}><Delete/></button>
                                </div>
                            </div>
                        </div>
                    )))
                }
            </div>
            }

        </div>
    )
}
