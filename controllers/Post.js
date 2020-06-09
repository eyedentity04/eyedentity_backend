const Post = require("../models/Post");
const Friends = require("../models/Friends");
const Like = require("../models/Like");
const mongoose = require("mongoose");

module.exports = {
  create: (req, res) => {
    Post.create({
      name: req.body.name,
      description: req.body.description,
      image: req.file && req.file.path,
      tag: req.body.tag,
      tagPlace: {
        namePlace: req.body.namePlace,
        long: req.body.long,
        lat: req.body.lat,
      },
      // like:req.body.like, comment: req.body.comment,
    })
      .then((response) => res.json(response))
      .catch((err) => {
        throw err;
      });
  },

  getAllData: (req, res) => {
    Post.aggregate([
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $addFields: {
          likes2: {
            $arrayElemAt: ["$likes", 0],
          },
        },
      },
      {
        $addFields: {
          likes3: "$likes2.like",
          likesCount: {
            $cond: {
              if: {
                $isArray: "$likes2.like",
              },
              then: {
                $size: "$likes2.like",
              },
              else: 0,
            },
          },
        },
        // }, {     $addFields: {         likedByMe: {$toBool: {             $size: {
        // $filter: { input: "$likes3", cond:{$eq: ["$$this.userLike",
        // mongoose.Types.ObjectId(req.body.userId)]}}}         }}     }
      },
      {
        $project: {
          likes: 0,
          likes2: 0,
        },
      },
    ])
      .then((resultLike) => {
        Post.find({})
          .sort({ date: "desc" })
          .populate("name", "name")
          .populate("tag", "name")
          .populate({ path: "commentId" })
          // .populate({path : ""}) .populate({path : "like"}) .populate ("like")
          // .populate ("comment")
          .populate({
            path: "post",
            populate: {
              path: "tagPlace",
            },
          })
          .then((response) => {
            let newResponse = [];
            if (response && response.length) {
              newResponse = response.map((responseItem) => {
                const found = resultLike.find((item) => {
                  return (
                    JSON.stringify(responseItem._id) == JSON.stringify(item._id)
                  );
                });
                let newItem = responseItem;
                if (found) {
                  newItem = {
                    ...found,
                    responseItem,
                  };
                }
                return newItem;
              });
            }
            res.json(newResponse);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
    // })
  },

  getPost: (req, res) => {
    Post.find({})
      .sort({ date: "desc" })
      .populate("name", "name")
      .populate("tag", "name")
      .populate("comment")
      .populate("like")
      .populate("comment.user", "name")
      .populate({
        path: "post",
        populate: {
          path: "tagPlace",
        },
      })
      .then((response) => res.json(response))
      .then(
        Post.aggregate([
          {
            $lookup: {
              from: "likes",
              localField: "_id",
              foreignField: "postId",
              as: "likes",
            },
          },
          {
            $addFields: {
              likes2: {
                $arrayElemAt: ["$likes", 0],
              },
            },
          },
          {
            $addFields: {
              likes3: "$likes2.like",
              likesCount: {
                $cond: {
                  if: {
                    $isArray: "$likes2.like",
                  },
                  then: {
                    $size: "$likes2.like",
                  },
                  else: 0,
                },
              },
            },
            // }, {     $addFields: {         likedByMe: {$toBool: {             $size: {
            // $filter: { input: "$likes3", cond:{$eq: ["$$this.userLike",
            // mongoose.Types.ObjectId(req.body.userId)]}}}         }}     }
          },
          {
            $project: {
              likes: 0,
              likes2: 0,
            },
          },
        ])
          .then((response) => {
            let newResponse = [];
            if (response && response.length) {
              newResponse = response.map((responseItem) => {
                const found = resultLike.find((item) => {
                  return (
                    JSON.stringify(responseItem._id) == JSON.stringify(item._id)
                  );
                });
                let newItem = responseItem;
                if (found) {
                  newItem = {
                    ...found,
                    responseItem,
                  };
                }
                return newItem;
              });
            }
            res.json(newResponse);
          })
          .catch((err) => {
            throw err;
          })
          .catch((err) => {
            throw err;
          })
      );
  },

  getAllDataTest: (req, res) => {
    Post.find({})
      .sort({ date: "desc" })
      .populate("name")
      .populate("tag", "name")
      .populate("comment")
      .populate("like")
      .populate("comment.user", "name")
      .populate({
        path: "post",
        populate: {
          path: "tagPlace",
        },
      })
      .then((response) => res.json(response))
      .catch((err) => {
        throw err;
      });
  },

  getDatabyID: (req, res) => {
    Post.findById(req.params.postID)
      .sort({ date: "desc" })
      .populate("name")
      .populate("tag", "name")
      .populate("comment")
      .populate("like")
      .populate("comment.user", "name")
      .populate({
        path: "post",
        populate: {
          path: "tagPlace",
        },
      })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },

  deletebyID: (req, res) => {
    Post.findByIdAndRemove(req.params.postID)
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },

  editByID: (req, res) => {
    Post.findByIdAndUpdate(req.params.postID, {
      description: req.body.description,
      image: req.file && req.file.path,
      tag: req.body.tag,
      tagPlace: {
        namePlace: req.body.namePlace,
        long: req.body.long,
        lat: req.body.lat,
      },
      // like:req.body.like, comment:req.body.comment, date:req.body.date
    })
      .populate("name", "name")
      .populate("tag", "name")
      .then((result) => res.json(result))
      .then((err) => {
        throw err;
      });
  },

  showUserPost: (req, res) => {
    const name = req.body.name;
    Post.find({ name })
      .sort({ date: "desc" })
      .populate("name", "name")
      .populate("tag", "name")
      .then((response) => res.json(response))
      .catch((err) => {
        throw err;
      });
  },
  getPostByUser: (req, res) => {
    Post.find({ name: req.params.userId })
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
};
