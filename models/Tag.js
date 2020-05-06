const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')


const tagNameSchema = new Schema ({

    tag : {
        type : Schema.Types.ObjectId,
        ref : User
    }
})


module.exports = mongoose.model('tag',tagNameSchema)