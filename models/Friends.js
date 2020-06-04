const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
  users: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const SchemaFriends = new Schema({
  friends: [friendsSchema],

  usersId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("friends", SchemaFriends);
