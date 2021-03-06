const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const Post = require("./Post");

const likeSchema = new Schema({
  userLike: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
});

const SchemaLike = new Schema({
  like: [likeSchema],

  postId: {
    type: Schema.Types.ObjectId,
    ref: Post,
  },
});

module.exports = mongoose.model("like", SchemaLike);
