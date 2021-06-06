const mongoose = require("mongoose")
const {Schema} = mongoose
const adminSchema = new Schema({
    name:{type:String,required: true,default:"Admin"},
    email:{type:String,unique: true,required: true,default:"admin@admin.com"},
    password:{type:String,required:true,default:"admin@123"},
    role:{type:String,required:true,default:"Admin"},
    active:{type:String,default:"active"}
})
const admin =mongoose.model("admin",adminSchema)
admin.create({},(err,data)=>{
    
})

module.exports ={Admin:admin} 