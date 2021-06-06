const mongoose = require("mongoose")
const {Schema} = mongoose
const userSchema = new Schema({
    name:{type:String,required: true},
    email:{type:String,unique: true,required: true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:"Publisher"},
    active:{type:String,default:"active"}
})
const user =mongoose.model("user",userSchema)

module.exports ={User:user} 