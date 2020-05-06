const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    
    description:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:false
    },

    like:{
        type:String,
        required:true
    },

    comment:{
        type:String,
        required:true
    },

    
    
    date:{
        type:Date,
        required: false
    },


})

module.exports = mongoose.model("post", postSchema)