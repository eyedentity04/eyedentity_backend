const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt= require('bcryptjs');
const saltRounds = 10 ;


const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    images : {
        type : String,
        default : "./public/images/2020-05-26T11:01:58.276Zjoker.jpeg"
    },
    backGroundImage : {
        type : String,
        default : "./public/images/2020-05-26T11:01:58.276Zjoker.jpeg"
    },
    about : {
        type : String,
        default : "tell me about you"
    }

});

// userSchema.pre("save",function(next){
//     this.password = bcrypt.hashSync(this.password,saltRounds)
//     next();
// });

module.exports = mongoose.model("users",userSchema);