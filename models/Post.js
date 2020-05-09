const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const TagPlace = require('./TagPlace')
const Comment = require ('./Comment')
const postSchema = new Schema({
    
    name : {
        type : Schema.Types.ObjectId,
        ref : User
    },

    description:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:false
    },

    like:[{
        type:Schema.Types.ObjectId,
        ref:User
    }],
    comment : [{

        comment:{
            type:String,
            ref: Comment
        },
        
        user:{
            type: Schema.Types.ObjectId,
            ref:User
        }
    }],

    tag : [{
        type:Schema.Types.ObjectId,
        ref:User
    }],


    tagPlace :[{
        namePlace :{
            type : String, 
            ref: TagPlace
        },
        
        long :{
            type : String,
            ref: TagPlace
        },

        lat :{
            type : String,
            ref : TagPlace
        }
        
        
    }],
    
    date:{
        type:Date,
        default : Date.now
    },


})

module.exports = mongoose.model("post", postSchema)