import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { listOrders, removeOrder} from '../actions/adminActions.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import Playone from '../components/Playone.js';
import Delete from '../icons/Delete.js';

export default function OrdersListScreen(props) {

    const [fresh, setFresh] = useState(false)

    const ordersList = useSelector(state => state.ordersList);

    const {loading , error , orders } = ordersList;

    const orderRemove = useSelector(state => state.orderRemove)

    const {loading:deleteLoading, success ,error:deleteError} = orderRemove;

    const dispatch = useDispatch();

    
    useEffect(() => {
        if(!success  || deleteError || error){
              dispatch(listOrders());
        }
           
        
      
    }, [deleteError, dispatch, error, fresh, success])

    



    const deleteHandler=(orderId) =>{

        dispatch(removeOrder(orderId))
    }
    


    return (
        <div className="usersList">
        <h1 style={{textDecoration:"underline"}}> Orders-List</h1>
        {
            loading ? <LoadingBox></LoadingBox>
        :
        error ?  <MessageBox varient="danger" >{error}</MessageBox>
        :
        <div className="orderLists">
        {
            orders.length===0 && <div className="noOrders"><h2 id="noOrders">No orders found sorry  ...!!</h2></div>
        }
        <div>{deleteError && <MessageBox varient="danger">{deleteError}</MessageBox>}</div>

        

            {
                orders.map(order =>(
                    <div className="orderList">
                        <div className='orderListname'>
                            <div>
                                 <h4>ID </h4> : <b>{order._id}</b>
                            </div>
                            

                            <div>
                                <h4>Shipping </h4> : <b id="nameBold">{order.shipping.fullname}{" , "}{order.shipping.address}{" ,"}{order.shipping.city}{"  , "}{order.shipping.postalCode}{" ,  "}{order.shipping.country}</b>
                            </div>
                            
                            <div>
                                <h4>CREATED_AT</h4>: <b>{order.createdAt.substring(0 ,10)}</b>
                            </div>
                           

                        </div>
                        <div className="orderListDetails">
                          
                            <div>

                                <h4>DELIVERY STATUS </h4>: {order.isDelivered? <b>&#x2705;</b>: <b> yet to be</b>}{order.isDelivered && <b>Delivered on :{order.deliveredAt}</b>}

                            </div>
                            <div>

                                <h4>PAYMENT STATUS </h4> :{!order.isPaid && <b style={{paddingLeft:10}}>Not paid</b>} 
                                {order.isPaid && <b> Payment-Details : Id : {order.paymentResult.payment_id } <b/><br/>
                                OrderId : {order.paymentResult.order_id ? order.paymentResult.order_id : "unavailable"}</b>}
                                
                            </div>
                            <div>
                                <h4>SMS status </h4>: <b style={{color : "#453452"}}>{order.paymentSms}</b>
                            </div>
                            <div>
                                <h4>Order - items </h4>:
                                {
                                    order.orderItems.map(
                                    item=>(
                                        <ul style={{listStyleType : "none" ,margin:0}}>
                                            
                                            <li style={{color : "#c93434"}}>
                                                <b style={{marginLeft : 15}}>Name</b> : <b style={{color : "#6e4b8d" , }}>{item.name}</b>  {"  "} 
                                                <b style={{marginLeft : 10}}> Count</b>  : <b style={{color : "#6e4b8d",}}>{item.qty}</b>
                                            </li>
                                        </ul>
                                        
                                    )
                                )
                                }
                            </div>
                           
                                
                            
                        </div>

                        <div className="buttons" style={{height:70 , width : 200}}>

                            <button type="button"  className ="button" onClick={()=>deleteHandler(order._id)}>{deleteLoading?<Playone></Playone>:<Delete/>}</button>
                        </div>
                    </div>
                ))
            }
        </div>
        }

    </div>
    )
}
