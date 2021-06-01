
import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user)=>{
    return jwt.sign({
        _id :user._id,
        _name :user.name,
        password :user.password,
        isAdmin :user.isAdmin,
        seller : user.seller

    } , config.JWT_SECRET,{
        expiresIn : '350d'
    })
} 



const isAuth =(req , res ,next) =>{
    const authorization = req.headers.authorization;
    if (authorization){
        const token = authorization.slice(7, authorization.length)
        jwt.verify(token 
            ,config.JWT_SECRET,
             (err , decode)=>{
         if(err){
             res.status(401).send({msg : "got invalid Token"})
         }
         else{   
         req.user = decode;
         next();
         
        }
        });
    }
    else{
        res.status(401).send({msg : "token not supplied"})
    }
}

const isAdmin= (req, res , next) =>{
    if(req.user && req.user.isAdmin){

        return next();
        
    }
    else{
        return res.status(401).send({msg:"Admin token is not valid"});
    }
} 
const isSeller= (req, res , next) =>{
    console.log(req.user)
    if(req.user && req.user.seller){

        return next();
    }
    else{
        return res.status(401).send({msg:"Seller token is not valid"});
    }
} 

export { getToken ,isAuth ,isAdmin ,isSeller}

