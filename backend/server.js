import http from "http";
import socket from "socket.io";
import express from 'express';
import config from './config';
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import userRoute from './routs/userRoute';
import productRoute from './routs/productRoute';
import bodyParser from 'body-parser';
import orderRouter from './routs/orderRoute';
import adminRouter from './routs/adminRouter';
import rezorRouter from './routs/rezorpayRouter';
import cors from 'cors';
import path from "path";


dotenv.config();


const port = process.env.PORT || 5000

const app=express()

const mongodbUrl =config.MONGODB_URL;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json({limit: '50mb'}))

app.use(bodyParser())


app.use("/uploads" ,express.static(path.join(__dirname,"uploads")))


app.use(express.static(path.join(__dirname,"/public")))

app.use(cors())

app.use(express.urlencoded({extended : true}));

app.use(express.json())

app.use(bodyParser({limit: '50mb'}));


mongoose.connect(mongodbUrl, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    

},
function (err,res){
    try {
        console.log("success connection")
    } catch (err) {
        throw err   
        }
        
    }
)


app.use("/api/users", userRoute);
  
app.use("/api/Products", productRoute);

app.use ("/api/orders" , orderRouter);

app.use ("/api/admin" , adminRouter);

app.use("/api/razorpay" , rezorRouter)

app.use((err ,req ,res ,next)=>{
    res.status(500).send({message : err.message})
})

if(process.env.NODE_ENV === "production"){

    app.use(express.static("frontend/build"))

}

const httpServer =http.Server(app)
const io = socket(httpServer)


io.on("connection", socket=>{
   socket.on("chat" , message=>{
       console.log(message);

       io.emit("chat " , message)
       
       console.log("done");
   })
})



httpServer.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
})
