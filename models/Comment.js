const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./User')
// const Post = require ('./Post')

const commentSchema = new Schema({
  userComment: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  // like :{
  //     type : Schema.Types.ObjectId,
  //     ref : "like"
  // },
  commentText: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const schemaComment = new Schema({
  comment: [commentSchema],
  postId: {
    type: Schema.Types.ObjectId,
    ref: "post",
    require: true,
  },
  // likeId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "like",
  // },
});

module.exports = mongoose.model("comment", schemaComment);
