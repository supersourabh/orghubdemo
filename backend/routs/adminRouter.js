import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Ads from '../models/adsModel';
import Order from '../models/orderModel';
import User from '../models/usermodel';
import { isAdmin, isAuth } from '../util';
import path from "path";
import multer from "multer";
import fs from "fs";

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

adminRouter.get("/ads/serve" , expressAsyncHandler( async (req , res) =>{
   
    const ads = await Ads.find({})
    if(ads){
        res.send(ads)
    }else{
        res.status(500).send({message : error.message})
    }   
}));  

adminRouter.post("/ads/delete/:id" , expressAsyncHandler( async (req , res) =>{
   
    const ads = await Ads.findById(req.params.id)
    const deleted  = ads.delete()

    if(deleted){
        res.send({message :"delete success"})
    }else{
        res.status(500).send({message : error.message})
    }   
}));  

adminRouter.use(express.static(path.join(__dirname,"/uploads/ads/")))

const storage =multer.diskStorage({
    
    destination :function(req ,file,cb){
        cb(null , path.join(__dirname, '/uploads/ads/'))
    },
    filename :function(req,file,cb){
    
        cb(null , file.fieldname+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage : storage,
    limits : {fileSize: 10 * 1024 * 1024}
}).single("file")


adminRouter.post("/ads/create" ,upload, expressAsyncHandler( async (req , res) =>{
    const file = req.file

    const ads = new Ads({
         name : req.body.name,
         discription : req.body.discription,
         media : {
             data: fs.readFileSync(path.join(__dirname + '/uploads/ads/' + file.filename)),
             contentType: req.file.mimetype
         }

     })

     
     const newAds = await ads.save()
     
     fs.unlinkSync(path.join(__dirname + '/uploads/ads/' + file.filename))

    if(newAds){

        res.send({message : "Ad save success"})

    }else{
        res.send({message : error.message})
    }
   
       
}));  




export default adminRouter;   