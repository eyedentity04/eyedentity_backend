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
    },
    backGroundImage : {
        type : String
    },
    about : {
        type : String
    }

});

// userSchema.pre("save",function(next){
//     this.password = bcrypt.hashSync(this.password,saltRounds)
//     next();
// });

module.exports = mongoose.model("users",userSchema);