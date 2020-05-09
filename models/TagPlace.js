const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const tagPlaceSchema = new Schema ({

    name:{
        type:String
    },
    long :{
        type:String
    },
    lat :{
        type:String
    }

})

module.exports = mongoose.model('tagPlace',tagPlaceSchema)