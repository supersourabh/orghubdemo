
import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import Details from '../icons/Details.js';

export default function OrderHistoryScreen(props) {

    const orderMineList = useSelector(state => state.orderMineList);

    const {loading , error , orders  } = orderMineList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrderMine())
        return () => {
            
        }
    }, [dispatch])


    return (
        <div>
            <h1> Order History</h1>
            {
                loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox varient="danger" >{error}</MessageBox>
            :<table className ="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                            {
                                orders.map(order=>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0 ,10)} {"and "}{order.createdAt.substring(11, 19)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? <b> Date : {order.paidAt.substring(0 ,10)}{order.paidAt.substring(11, 19)}</b> : "Not paid"}</td>
                                    <td>{order.isdelivered ? order.deliveredAt : "Yet to be"}</td>
                                    <td>
                                        <button type="button" className="buttonEdit"onClick={()=>{props.history.push(`/orders/${order._id}`)}}><Details/></button>
                                    </td>
                                </tr>       
                                ))
                        }
                    </tbody>
                
            </table>
          
            
            }

        </div>
    )
}
