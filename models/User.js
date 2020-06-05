const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "./public/images/night-photograph-2183637_1280.jpg",
  },
  backGroundImage: {
    type: String,
    default: "./public/images/dream-4827288_1280.jpg",
  },
  about: {
    type: String,
    default: "tell me about you",
  },
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

// userSchema.pre("save",function(next){
//     this.password = bcrypt.hashSync(this.password,saltRounds)
//     next();
// });

module.exports = mongoose.model("users", userSchema);
