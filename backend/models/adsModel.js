import mongoose from 'mongoose';


const adsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    discription: { type: String, required: true },
    media: { data: Buffer, contentType: String }
},{
    timestamps : true
})

 const Ads = mongoose.model("Ads" , adsSchema)


 export default Ads