import express, { response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import { isAuth } from '../util';


const Razorpay=require('razorpay') 
const request =require("request")
const keys = require('../keys')
const rezorRouter = express.Router()

const razorInstance = new Razorpay({
    key_id : keys.rezorIdKey,
    key_secret : keys.razorIdSecret
})

rezorRouter.get("/order/:orderId" , expressAsyncHandler(  async(req ,res )=>{
    const orderId= req.params.orderId
    const order =  await Order.findById(orderId)

    const amountOrder = Math.round(order.totalPrice)
    
    try {
        const options = {
            amount :amountOrder*100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: orderId.toString()
           
        } ;
        razorInstance.orders.create(options, function( err ,order ){
            //console.log(order)
            if(err){
                
                return res.status(500).json({message : err})

            }else{

                return res.status(200).json(order)

            }
        })

    } catch (error) {

        return res.status(500).json({message : error.message})

    }
}))

rezorRouter.post("/capture/:paymentId" ,expressAsyncHandler( (req , res)=>{
    try {
        return request(
            {
                method : "post",
                url : `https://${keys.rezorIdKey}:${keys.razorIdSecret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
                form :{
                    amount : 10*100,
                    currency : "INR"
                },
            },
            async (err , response , body )=>{
                if(err){
                    return res.status(500).json({message : "something went wrong!!!!!!!"})
                }
                return res.status(200).json(body)
            }
        )
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}))

export default rezorRouter