const mongoose = require("mongoose")
const {Schema} = mongoose
const categorySchema = new Schema({
    name:{type:String,required: true},
})
const category =mongoose.model("category",categorySchema)

module.exports ={Category:category} 