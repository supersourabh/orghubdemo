import mongoose, { Mongoose } from 'mongoose';
   

const orderSchema = new mongoose.Schema({
    orderItems :[{
        name :{type :String, required:true},
        qty  :{type :Number , required:true},
        image :{
            data : Buffer,
            contentType : String
        },
        price  :{type :Number , required:true},
        product :{type :mongoose.Schema.Types.ObjectId,  ref :'Product' ,required:true},
    }],
    shipping :{
        fullname :{type :String, required:true},
        address :{type :String, required:true},
        city :{type :String, required:true},
        postalCode :{type :Number, required:true},
        country :{type :String, required:true},
    },
    payment :{type : String , required:true},

    paymentResult :{
        payment_id :   String ,
        order_id : String,
        status : String , 
        updated_time : String , 
        signature :  String, 
    },
    
    itemsPrice :{type :Number, required:true},

    shippingPrice :{type :Number, required:true},

    taxPrice :{type :Number, required:true},

    totalPrice :{type :Number, required:true},

    user :{
        type : mongoose.Schema.Types.ObjectId ,  ref : 'User' ,required: true
    },

    isPaid :{type :Boolean , default : false},

    paidAt :{ type : Date },

    isDelivered :{type :Boolean , default : false},

    deliveredAt :{type :Date},

    paymentSms : {type : String}
   

    
},{
    timestamps:true
},{
    typeKey: '$type' 
})


const Order = mongoose.model("Order" , orderSchema);


export default Order;