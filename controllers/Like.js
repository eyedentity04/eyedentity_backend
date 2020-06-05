const Like = require("../models/Like");
const mongoose = require("mongoose");

module.exports = {
  createLike: (req, res) => {
    Like.findOne({ "like.userLike": { $in: [req.body.userLike] } }).then(
      (result) => {
        console.log(result.postId);
        console.log(result);
        if (result) {
          return res
            .status(400)
            .json({ likeAdded: "you can not like post twice" });
        } else {
          let condition;
          let update;
          if (req.body.postId) {
            condition = {
              postId: {
                $eq: mongoose.Types.ObjectId(req.body.postId),
              },
            };
            update = {
              postId: req.body.postId,
            };
          }

          Like.findOneAndUpdate(
            condition,
            {
              ...update,
              $push: {
                like: [
                  {
                    userLike: req.body.userLike,
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
              useFindAndModify: false,
            }
          )
            .then((result) => res.json(result))
            .catch((err) => res.json(err));
        }
      }
    );
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
