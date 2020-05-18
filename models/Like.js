const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const Post = require('./Post')


const likeSchema = new Schema ({ 

    like : {
            type : Schema.Types.ObjectId,
            ref : User,
            
        },
        post : {
            type : Schema.Types.ObjectId,
            ref : Post
        },
        date : {
            type : Date,
            default : Date.now
        }

        
})

module.exports = mongoose.model("like",likeSchema)