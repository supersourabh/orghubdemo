import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import User from '../models/usermodel';
import { isAdmin, isAuth } from '../util';

const adminRouter =express.Router();

adminRouter.post("/ordersList" ,isAuth,isAdmin, expressAsyncHandler(async (req , res)=>{
    const orders = await Order.find({});
    if(orders){
        
        res.send(orders)
        
        } 
    else{
        res.status(404).send({msg : "orders not found" });
    }

}));


adminRouter.post("/usersList" ,isAuth,isAdmin, expressAsyncHandler(async (req , res)=>{
    const users = await User.find({});
    if(users){
        res.send(users) 
        } 
    else{
        res.status(404).send({msg : "Users not found" });
    }

}));



adminRouter.delete("/usersList/:id" ,isAuth,isAdmin, expressAsyncHandler( async (req , res) =>{
    const deletedUser = await User.findById(req.params.id)
    const deletedOrder = await Order.find({user : req.params.id})
   

    if(deletedUser){

        await User.remove(deletedUser);
       
        res.send({msg : "User deleted successfully"})
    }
    else{
         res.send({msg :"User in deletion"})
    }
   
    if(deletedUser){
        const deletedOrder = await Order.deleteMany({user : req.params.id})
  
        await Order.deleteOne(deletedOrder);
        
       
        res.send({msg : "order deleted successfully"})
    }
    else{
         res.send({msg :"order in deletion"})
    }
   
}));  


adminRouter.post("/userInfo" ,expressAsyncHandler(async (req ,res)=>{
    const userList =await User.find({})
    
    if(userList){
        res.send(
           userList
        )
        }else{
            res.status(401).send({msg : 'Wrong info'})
        }

})  );



adminRouter.delete("/deleteOrder/:id" ,isAuth,isAdmin, expressAsyncHandler( async (req , res) =>{
   
    const deletedOrder = await Order.deleteOne({_id : req.params.id})
   
        await Order.deleteOne(deletedOrder);
        
       
        res.send({msg : "order deleted successfully"})
}));

adminRouter.get("/deleteOrder/all" ,isAuth,isAdmin, expressAsyncHandler( async (req , res) =>{
   
    const deletedOrder = await Order.remove()
   
        res.send({msg : "all order deleted successfully"})
}));  




export default adminRouter;   