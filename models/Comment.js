const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const Post = require ('./Post')

const commentSchema = new Schema ({

        comment : {
            type : String
        },
        user :{
            type : Schema.Types.ObjectId,
            ref : User
        },
        post : {
            type : Schema.Types.ObjectId,
            ref : Post
        },

        date :{
            type : Date,
            default : Date.now
        }
        

})

module.exports = mongoose.model("comment",commentSchema)