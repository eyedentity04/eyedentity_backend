const Comment = require("../models/Comment");
const Post = require("../models/Post");
const mongoose = require("mongoose");

const validatorComment = require("../validator/Comment")

module.exports = {
  createComment: (req, res) => {
    const {errors , isValid} = validatorComment(req.body)

    if(!isValid){
      return res 
        .status(400)
          .json(errors)
    }

  
    let condition;
    let update;
    if (req.body.targetPostId) {
      condition = {

        postId: {

          $eq: mongoose.Types.ObjectId(req.body.targetPostId),
  
        },
      };

      update = {
        postId: req.body.targetPostId,
        // likeId: req.body.likeId,
      };
    }
    Comment.findOneAndUpdate(
      condition,
      {
        ...update,
        $push: {
          comment: [
            {
              userComment: req.body.userComment,
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
      .populate({path : "postID"})
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
  getCommentByTargetId: (req, res) => {
    Comment.find({
      postId: req.params.targetPostId,
    })
      .populate({ path: "postId" })
      .populate({ path: "comment.userComment", model: "users" })
      .then((result) => {
        
        result.forEach((item)=> {
          console.log(item)
          if(item.comment == null || item.comment == undefined){
            return res  
              .status(400)
                .json(err)
          }else{
            return res.json(item.comment.reverse())
          }
         
        })
      }).catch(err => res.status(400).json({status : "in this post there are not comment or something hapend", error : err}))
  },
  // getCommentByTargetId: (req, res) => {
  //   Comment.aggregate([
  //     {
  //       $project: {
  //         postId: 1,
  //         comment: { $reverseArray: "$comment" },
  //       },
  //     },
  //   ])
  //     .then((hasil) => {
  //       Comment.find({ postId: req.params.targetPostId })
  //         .populate({ path: "postId" })
  //         .populate({ path: "comment.userComment", model: "users" })
  //         .then((result) => {
  //           let newResult = [];
  //           if (result && result.length) {
  //             newResult = result.map((resultItem) => {
  //               const found = hasil.find((item) => {
  //                 console.log(item._id);
  //                 console.log(resultItem.id);
  //                 return (
  //                   JSON.stringify(resultItem._id) == JSON.stringify(item._id)
  //                 );
  //               });
  //               let newItem = resultItem;
  //               console.log(resultItem);
  //               if (found) {
  //                 newItem = {
  //                   ...found,
  //                   resultItem,
  //                 };
  //               }
  //               return newItem;
  //             });
  //           }
  //           console.log(newResult);
  //           res.json(newResult);
  //         })
  //         .catch((err) => {
  //           throw err;
  //         });
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // },
};
