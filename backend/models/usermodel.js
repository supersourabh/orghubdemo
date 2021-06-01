import  mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    
    name :{type : String  ,  required : true},
    email :{type : String  , required : true, unique : true},
    password :{type : String , required : true},
    isAdmin :{type : Boolean , required:true ,default : false},
    phoneNumber :{type : Number },
    seller :{type : Boolean , required:true ,default : false},
    profileImage:{
        data: Buffer,
        contentType: String,
    },
   
},{
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

export default User ;