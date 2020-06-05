const Comment = require("../models/Comment");
const Post = require("../models/Post");
const mongoose = require("mongoose");

module.exports = {
  createComment: (req, res) => {
    var req;
    let condition;
    let update;
    if (req.body.targetPostId) {
      condition = {
        // ...condition,
        postId: {
          // $all: [
          //     {
          //         $elemMatch:{
          $eq: mongoose.Types.ObjectId(req.body.targetPostId),
          //     }
          // }
          // ]
        },
      };

      update = {
        // ...update,
        postId: req.body.targetPostId,
        likeId: req.body.likeId,
      };
    }
    Comment.findOneAndUpdate(
      condition,
      {
        ...update,
        $push: {
          comment: [
            {
              userComment: req.body.userId,
              commentText: req.body.commentText,
            },
          ],
        },
        $set: {
          ...update,
        },
      },
      {
        upsert: true,
        new: true,
      }
    )
      .then((response) => {
        res.json(response);
      })
      .catch((err) => res.status(400).json(err));
  },

  commentCount: (req, res) => {
    Comment.aggregate([
      {
        $project: {
          _id: 0,
          postId: 1,
          comments: {
            $cond: {
              if: { $isArray: "$comment" },
              then: { $size: "$comment" },
              else: 0,
            },
          },
        },
      },
    ])
      .then((result) => res.json(result))
      .catch((err) => status(400).json(err));
  },

  deleteById: (req, res) => {
    Comment.findByIdAndRemove(req.params.commentID)
      .then((result) => res.json(result))
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  show: (req, res) => {
    Comment.find({})
      .sort({ date: "desc" })
      .populate("user", "name")
      .populate({ path: "postId", populate: { path: "tag" } })
      .populate({ path: "comment.userComment", model: "users" })
      .populate({ path: "likeId" })
      .then((result) => res.json(result))
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  editByID: (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentID, {
      comment: req.body.comment,
      user: req.body.use,
      post: req.body.post,
    })
      .then((result) => res.json(result))
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  getDatabyID: (req, res) => {
    Comment.findById(req.params.commentID)
      .populate("user", "name")
      .populate("post", "_id")
      .then((result) => res.json(result))
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  // getCommentByTargetId: (req, res) => {
  //   Comment.find({
  //     postId: req.params.targetPostId,
  //   })
  //     .populate({ path: "postId" })
  //     .populate({ path: "comment.userComment", model: "users" })
  //     .then((result) => res.json(result))
  //     .catch((err) => res.status(400).json(err));
  // },
  getCommentByTargetId: (req, res) => {
    Comment.aggregate([
      {
        $project: {
          postId: 1,
          comment: { $reverseArray: "$comment" },
        },
      },
    ])
      .then((hasil) => {
        Comment.find({ postId: req.params.targetPostId })
          .populate({ path: "postId" })
          .populate({ path: "comment.userComment", model: "users" })
          .then((result) => {
            let newResult = [];
            if (result && result.length) {
              newResult = result.map((resultItem) => {
                const found = hasil.find((item) => {
                  console.log(item._id);
                  console.log(resultItem.id);
                  return (
                    JSON.stringify(resultItem._id) == JSON.stringify(item._id)
                  );
                });
                let newItem = resultItem;
                console.log(resultItem);
                if (found) {
                  newItem = {
                    ...found,
                    resultItem,
                  };
                }
                return newItem;
              });
            }
            console.log(newResult);
            res.json(newResult);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  },
};
