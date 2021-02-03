const mongoose = require("mongoose")
const {Schema} = mongoose
const imageSchmema = Schema({
    author:{
        type:String,
        required:true
    },
    imageSource:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    tags:{
        type:[String]
    },
    createdAt:{
        type:Date,
        required:true,
        default: new Date
    }
})

module.exports =  mongoose.model("Image", imageSchmema)