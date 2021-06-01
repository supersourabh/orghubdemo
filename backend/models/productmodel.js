import  mongoose, {  SchemaTypes } from 'mongoose';


const productSchema = new mongoose.Schema({
    
    name :{type : String ,required : true , unique : true},
    price :{type :  Number ,default: 0,required : true},
    image :{
        
        data: Buffer,
        contentType: String,
        
    },
    breed :{type : String ,required : true},
    catagory :{type : String ,required : true},
    countInStock :{type : Number ,required : true, default : 0, required: true},
    discription :{type : String ,required : true, default : " discription not awail"},
    likes :{type : Number, required: true , default:5},
    stars :{type : Number ,required : true, default :0},
    reviews :{type : Number ,required : true, default :0},
    sellerId: {type : mongoose.Schema.Types.ObjectId ,  ref : 'User' ,required: true }
    
},
{
    timestamps :true
});

const Product = mongoose.model('Product', productSchema);

export default Product;