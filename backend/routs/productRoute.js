import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productmodel';
import { getToken, isAdmin, isAuth, isSeller } from '../util';
const path= require("path")
const fs= require("fs")
const mongodb= require('mongodb')
const multer =require("multer") 


const router =express.Router();

router.use(express.static(path.join(__dirname,"/uploads")))

const storage =multer.diskStorage({
    
    destination :function(req ,file,cb){
        cb(null , path.join(__dirname, '/uploads'))
    },
    filename :function(req,file,cb){
    
        cb(null , file.fieldname+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage : storage,
    limits : {fileSize: 3 * 1024 * 1024}
}).single("file")



router.post("/new" , upload,isAuth, expressAsyncHandler(async (req , res )=>{
    
    const file=req.file
    
    const product = new Product({
        name : req.body.name,
        price : req.body.price,
        image: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + file.filename)),
            contentType: 'image/png'
        },
        breed: req.body. breed,
        catagory : req.body.catagory,
        countInStock : req.body.countInStock,
        discription : req.body. discription||"discription not awail",
        stars : req.body. stars,
        reviews : req.body. reviews,
        likes : req.body.likes,
        sellerId : req.body.userId
        
    });

    const newProduct =await product.save()

    fs.unlinkSync(path.join(__dirname + '/uploads/' + file.filename) )

    if(newProduct){
        res.status(201).send({msg:"New Product Created Successfully" , data :newProduct});
        }
        else{
        return res.status(500).send({msg:"Error in creating product"})
    }
        
    
   
}));




router.put("/:id/edit" , isAuth , upload, expressAsyncHandler( async (req , res )=>{
    const productId = req.params.id;
    const product = await Product.findById(productId)
    const file = req.file

    if(product){
        product.sellerId=req.body.userId
        product.name = req.body. name;
        product.price = req.body. price;
        product.image= {
            
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + file.filename)),
            contentType: 'image/png'
            
        }
        fs.unlinkSync(__dirname + '/uploads/' + file.filename)
        product.breed= req.body. breed;
        product.catagory = req.body. catagory;
        product.countInStock = req.body. countInStock;
        product.discription = req.body. discription ||"discription not awail ....!!!!";
       
        

    const updatedProduct =await product.save()
        

    if(updatedProduct){
        
        res.status(200).send({msg:"New Product Updated Successfully" , data :updatedProduct});
      }
   
    }
   
    return res.status(500).send({msg:"Error in updating product"})
}));





router.get("/list" , expressAsyncHandler(  async (req ,res)=>{
    const products = await Product.find({});
    res.send(products);
}));

router.get("/list/:catagory" , expressAsyncHandler(  async (req ,res)=>{
    const products = await Product.find({catagory : req.params.catagory});
    res.send(products);
}));


router.get("/image/:id" , expressAsyncHandler(  async (req ,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.send(product.image);
    } catch (error) {
        res.status(500).send({message : error.message})
    }
    


}));


router.get("/:id" , expressAsyncHandler(async (req ,res) =>{
    const product = await Product.findOne({_id: req.params.id});
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({msg : "product not found"})
    }
}));

router.put("/:productId/likes" ,isAuth, expressAsyncHandler(async (req ,res) =>{
    const product = await Product.findById(req.params.productId)
    const uplikes = product.likes+1
    if(product){
        Product.updateOne(
            {_id : product._id},
            {
                $inc :{
                    "likes" : +1
                }
            },
            {
                multi :true
            }
        )
            
        
            
        const productupdates= await Product.findOne({_id: req.params.productId});
        res.send(productupdates)
            
        res.send({message : "product like success"})
    }
    else{
        res.status(404).send({msg : "product not found"})
    }
   
}));


router.post ('/:id/seller' ,isAuth  , expressAsyncHandler( async (req ,res)=>{

    const orders = await Product.find({sellerId : req.params.id})
    
    res.send(orders)


}) )




router.delete("/:id" ,isAuth ,isAdmin, expressAsyncHandler( async (req , res) =>{
    const deletedProduct = await Product.findById(req.params.id)
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({msg : "product deleted successfully"})
    }
    else{
         res.send({msg :"error in deletion"})
    }
   
}));




export default router ;