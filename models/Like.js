const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const Post = require('./Post')


const likeSchema = new Schema ({ 
    userLike: Schema.Types.ObjectId
    // userLike : {
    //     _id: false,
    //     type : Schema.Types.ObjectId,
    //     ref : "user"
    // }

        
})

const SchemaLike = new Schema ({
    like : [likeSchema],
    postId :
        {
            type : Schema.Types.ObjectId,
            ref : "post"
        }
})

module.exports = mongoose.model("like",SchemaLike)