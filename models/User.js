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
    image : {
        type : String,
        default : "./public/user/2020-05-27T11:38:57.373Zmonkey.jpeg"
        
    },
    backGroundImage : {
        type : String,
        default : "./public/user/2020-05-27T11:38:57.373Zmonkey.jpeg"
       
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