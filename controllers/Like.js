const Like = require("../models/Like");
const mongoose = require("mongoose");

module.exports = {
  createLike: (req, res) => {
    Like.findOne({ "like.userLike": req.body.userId }).then((result) => {
      if (result) {
        return res.status(400).json({ likeAdded: "you cant like post twice" });
      } else {
        let condition;
        let update;

        //    Like.findOne({
        //        postId: mongoose.Types.ObjectId(req.body.targetPostId),
        //        like: {
        //            $elemMatch: {
        //                userLike: req.body.userId
        //            }
        //        }
        //    })
        //    .then(response => {
        //        console.log(response.like);

        //    })

        if (req.body.targetPostId) {
          condition = {
            postId: mongoose.Types.ObjectId(req.body.targetPostId),
          };
          update = {
            ...update,
            postId: [req.body.targetPostId],
          };
        }

        Like.findOneAndUpdate(
          condition,
          {
            ...update,
            $push: {
              like: [{ userLike: req.body.userId }],
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
            console.log("di like", response);
            res.json(response);
          })
          .catch((err) => res.status(400).json(err));
      }
    });
  },

  like: (req, res) => {
    Like.aggregate([
      {
        $project: {
          _id: 0,
          postId: 1,
          likes: {
            $cond: {
              if: { $isArray: "$like" },
              then: { $size: "$like" },
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
    Like.findByIdAndRemove(req.params.likeID)
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },

  show: (req, res) => {
    Like.find({})
      .populate({ path: "userLike" })
      // .populate('post','_id')
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },

  editByID: (req, res) => {
    Like.findByIdAndUpdate(req.params.likeID, {
      like: req.body.like,
      post: req.body.post,
    })
      .then((result) => res.json(result))
      .then((err) => {
        throw err;
      });
  },
  showLikePost: (req, res) => {
    const post = req.body.post;
    Comment.find({ post })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  Hitung: (req, res) => {
    Like.find({ postId: req.params.postId })

      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
};
