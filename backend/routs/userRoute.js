import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import User from '../models/usermodel.js';
import { getToken, isAdmin, isAuth, seller } from '../util';
import data from '../data';
import bcrypt from 'bcryptjs';
import Product from '../models/productmodel.js';
import multer from 'multer';
import path from 'path'
import fs from 'fs'

const router = express.Router();



router.post("/signin", expressAsyncHandler(async (req,res)=>{
   
    const signinUser = await User.findOne({email : req.body.email});

    //const profile = new Buffer.from(signinUser.profileImage.data.buffer)
    //const profile = imageSrc(signinUser)
    //console.log(imageSrc(signinUser));

    if(signinUser){
      
        if(bcrypt.compare( req.body.password , signinUser.password  )){
            
            res.send({
            _id : signinUser.id,
            name : signinUser.name,
            email : signinUser.email,
            isAdmin : signinUser.isAdmin,
            seller : signinUser.seller,
            phoneNumber : signinUser.phoneNumber,
           // profileImage:signinUser.profileImage,
            token :getToken(signinUser),
            
             
        })
        }else{
            res.status(401).send({msg : 'wrong password'})
        }
        
        
    }else{
        res.status(401).send({msg : 'Invalid email or password'})
    }
}));

router.post('/register',expressAsyncHandler( async (req,res)=>{

    const user =new User({
        name : req.body.name,
        email : req.body.email,
        password :req.body.password ,
        profileImage : {
            data: fs.readFileSync(path.join(__dirname + '/uploads/profile/' + "thumbil.png")),
            contentType: 'image/png'
        }
    });
    const newUser = await user.save();

   if(newUser){
    res.send({
        _id : newUser.id,
        name : newUser.name,
        email : newUser.email,
        isAdmin : newUser.isAdmin,
        seller :newUser.seller,
        phoneNumber : newUser.phoneNumber,
        /*profileImage : newUser.profileImage,*/
        token :getToken(newUser)
    })
    }  
  
    else{
        res.status(401).send({msg : 'Invalid user datails'})
    }
}))


router.get('/seed' , expressAsyncHandler ( async (req ,res )=>{
    const createdUser = await Product.insertMany(data.products);
    res.send({createdUser})
}))

router.get('/image/:id' , expressAsyncHandler ( async (req ,res )=>{
    const id = req.params.id
    const user = await User.findOne({_id : id});
    

    if(user){
        res.send(user.profileImage)
    }else{
        res.status(404).send({message : error.message})
    }


}))



router.get("/:id", expressAsyncHandler( async (req,res)=>{
  

    const user = await User.findById(req.params.id);

    if(user){
        res.send({
            _id : user.id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            seller :user.seller,
            phoneNumber : user.phoneNumber,
            /*profileImage : user.profileImage,*/
            token :getToken(user)
        })
    }else{
        res.status(404).send({msg :  "user not found"})
    }
           
      
}));     


router.use(express.static(path.join(__dirname,"/uploads/profile")))

const storage =multer.diskStorage({
    
    destination :function(req ,file,cb){
        cb(null , path.join(__dirname, '/uploads/profile'))
    },
    filename :function(req,file,cb){
    
        cb(null , file.fieldname+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage : storage,
    limits : {fileSize: 5 * 1024 * 1024}
}).single("profileImage")




router.put("/profile", isAuth, upload ,expressAsyncHandler(async (req ,res)=>{

    const user = await User.findById(req.body.userId)
    const file =req.file
 
   const profileImage = user.profileImage


   if(profileImage){

       user.update({_id : req.body.userId},{$unset:{profileImage : profileImage}})

   }



    if( user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.phoneNumber!==undefined){
            user.phoneNumber = req.body.phoneNumber
        }

        if(file){
            user.profileImage={
                
                data: fs.readFileSync(path.join(__dirname + '/uploads/profile/' + file.filename)),
                contentType: 'image/png'
            }
            fs.unlinkSync(path.join(__dirname + '/uploads/profile/' + file.filename))

        }else{
            user.profileImage={
                data: fs.readFileSync(path.join(__dirname + '/uploads/profile/' + 'thumbil.png')),
                contentType: 'image/png'
            }

        }
        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password , 8)
        }
        if(req.body.seller){
            user.seller = req.body.seller || false
        }
        
        const updated = await user.save();

        res.send (
            {
                _id: updated._id,
                name: updated.name,
                email: updated.email,
                isAdmin: updated.isAdmin,
                seller :updated.seller,
                /* profileImage:updated.profileImage,*/
                token : getToken(updated)

            }
        )

    }

}));




export default router ;