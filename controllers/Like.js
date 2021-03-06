const Like = require("../models/Like");
const mongoose = require("mongoose");

module.exports = {
  createLike: (req, res) => {
    let create = () => {
      let condition;
      let update;
      if (req.body.postId) {
        condition = {
          $and : [
            {
              postId: {
                $eq: mongoose.Types.ObjectId(req.body.postId),
              },
              "like.userLike" : {
                $ne : mongoose.Types.ObjectId(req.body.userLike)
              }
            }
          ]
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
          // useFindAndModify: false,
        }
      )
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
    };
    Like.findOne({ postId: req.body.postId })
      .then((result) => {
        if (result == null) {
          create();
        } else {
          Like.findOne({$and :[{postId :{$eq : req.body.postId}},{"like.userLike" :{$eq : req.body.userLike}}]})
            .then((response) => {
              console.log(response);
              if (response) {
                return res.status(400).json("kamu tidak bisa like");
              } else {
                create();
              }
            })
            .catch((err) => status(400).json(err));
        }
      })
      .catch((err) => status(400).json(err));
  },

  // createLike : (req, res) => {
  //   Like.findOne(
  //     {$and:[{postId : {$eq : req.body.postId}},{"like.userLike" : {$ne : req.body.userLike}}]},
  //     // {
  //     //   $push:{
  //     //     like : [
  //     //       {
  //     //         userLike : req.body.userLike
  //     //       }
  //     //     ]
  //     //   },
  //     //   $set : {
  //     //     postId : req.body.postId
  //     //   }
  //     // },
  //     // {
  //     //   upsert : true,
  //     //   useFindAndModify : true
  //     // }
  //     )
  //     .then((result) =>{
  //       console.log(result)
  //       if(result == null){
  //         Like.findOneAndUpdate(
  //           {$and:[{postId : {$ne : req.body.postId}},{"like.userLike" : {$ne : req.body.userLike}}]},
  //           {$push : {like : [{userLike : req.body.userLike}]},$set :{postId : req.body.postId}},
  //           {
  //             upsert : true,
  //             new : true
  //           }
  //         ).then(result => res.json(result)).catch(err => status(400).json(err))
  //       }else{
  //         Like.findOneAndUpdate(
  //           {$and:[{postId : {$eq : req.body.postId}},{"like.userLike" : {$eq : req.body.userLike}}]},
  //           {$push : {like : [{userLike : req.body.userLike}]},$set :{postId : req.body.postId}},
  //           {
  //             upsert : true,

  //           }
  //         ).then(result => res.json(result)).catch(err => status(400).json(err))
  //       }
  //     })
  //   .catch(err => status(400).json(err))
  // },

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
