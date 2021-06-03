import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import mongoose from 'mongoose';
import {  isAuth } from '../util';
import User from '../models/usermodel';
import fast2sms from 'fast-two-sms'
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
var client = new twilio(accountSid, authToken);


const orderRouter =express.Router();

orderRouter.get ('/mine' ,isAuth , expressAsyncHandler( async (req ,res)=>{

    const orders = await Order.find({user: req.user._id})

    res.send(orders)


}) )



orderRouter.post('/' ,isAuth, expressAsyncHandler(async (req , res )=>{
    if (req.body.orderItems===0){
        res.status(400).send({msg : "cart is empty"});
    }
    else{
        
        const order =  await new Order(
            {
                orderItems : req .body.orderItems,
                shipping : req .body.shipping,
                payment : req .body.payment,
                itemsPrice : req .body.itemsPrice,
                shippingPrice : req .body.shippingPrice,
                taxPrice : req .body.taxPrice,
                totalPrice : req .body.totalPrice,
                user : req.user._id,
                

            }
        );
        const createdOrder =  await order.save();

        res.status(201).send({msg : 'Order created ' , order : createdOrder}); 


        const user = await User.findById(createdOrder.user)

        if(createdOrder){
            if(user.phoneNumber){
                
                var options = {authorization : process.env.f2sKey , message : `Dear ${user.name} your ORGHUB order of price Rs ${ req .body.totalPrice}  placed and your order Id is ${createdOrder._id} ,please keep this message for future reference..thank you `,  numbers : [`${user.phoneNumber}`] } 
                const res = fast2sms.sendMessage(options)
                console.log("sms success")
                createdOrder.paymentSms = "success"
                console.log(res);

                 
                
                client.messages.create({
                     body: `Dear ${user.name} ,your order of Rs ${createdOrder.totalPrice} is placed and your order id is ${createdOrder._id} ,please keep this message for future..`,
                     from: '+15595308121',
                     to: `+91${user.phoneNumber}`
                   })
                  .then(message => console.log(message.sid))
                  .then(error=>console.log(error))

                  
            }else{
                console.log("sry")
                createdOrder.paymentSms = "fail"

            }
            

            

        }else{
            res.status(500).send({msg : "order place failed"})
        }
       
    }
}
));



orderRouter.get('/:id' ,isAuth, expressAsyncHandler(async (req , res )=>{
    
    const order = await Order.findOne({_id :req.params.id});
   
        
    if (order){
        
        res.send(order);

    }
    else{
        res.status(404).send({msg : "order not found"})
    }
}));

orderRouter.get("/:id/pay/:user/:payment/:order/:sign", isAuth , expressAsyncHandler(async (req , res)=>{

    const userId = req.params.user

    const orderId= req.params.order

    const sign= req.params.sign

    const payment = req.params.payment


    
    try {
        const order = await Order.findById(req.params.id);
        
        
        if(order){
            order.isPaid = true;
            order.paidAt = Date.now();  
            order.paymentResult = { 
                //payment_id : req.body.response.razorpay_payment_id , 
                payment_id : payment , 
                //order_id : req.body.response.razorpay_order_id ,
                order_id : orderId ,
                status :"success" , 
                updated_time : Date.now() , 
                signature : sign
            }
            if(userId){
                
                const userInfo = await User.findById(userId)
                
                var options = {authorization : process.env.f2sKey , message : `Dear ${userInfo.name} your ORGHUB order of price Rs ${ order.totalPrice}   is paid through RAZORPAY PAYMENT & your order : ${req.params.id}  & PayId : ${payment}d ,keep this message for ref`,  numbers : [`${userInfo.phoneNumber}`] } 
                const res = fast2sms.sendMessage(options)
                order.paymentSms = "success"
                console.log("PAYMENT" )
                console.log( res )
            }else{
                console.log("sry from pay")
                order.paymentSms = "fail"

            }
             
        
        const updatedOrder = await order.save();
        

        res.send({message :"Order paid" , order : updatedOrder})

       
        
        }else{
            res.status(500).send({msg : "order not found" });
        }




    } catch (error) {
        res.send({message : error.message})
    }
    

}))





export default orderRouter;