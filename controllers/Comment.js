const Comment = require("../models/Comment")
const Post = require("../models/Post")
const mongoose = require("mongoose");


module.exports= {
    
    

    createComment : (req,res) => {
        var req
        let condition
        let update
        if(req.body.targetPostId){
            condition = {
                ...condition,
                postId :{
                    $all:[
                        {
                            $elemMatch:{
                                $eq : mongoose.Types.ObjectId(req.body.targetPostId)
                            }
                        }
                    ]
                }
            }
            update ={
                ...update,
                postId : [req.body.targetPostId],
                likeId : [req.body.likeId]
            }
        }
        Comment.findOneAndUpdate(
            {...condition},
            {
                $push:{
                    comment :[{
                        userComment : req.body.userComment,
                        commentText : req.body.commentText
                        
                    
                    }]
                        
                    
                },
                $set:{
                    ...update
                },
                
            },
            {
                upsert : true,
                new : true
            }
        ).then((response) => {
             res.json(response);
          })
          .catch((err) => res.status(400).json(err));
   
    },

    deleteById : (req,res) => {
        Comment.findByIdAndRemove(req.params.commentID)
        .then((result) => res.json(result))
        .catch(err => {
            throw err
        })
    },

    show : (req,res) => {
        Comment.find({})
        .populate("user","name")
        .populate("post","_id")
        // .populate({path : "post",populate:{path : "post"}})
        .then((result)=>res.json(result))
        .catch(err =>{
            throw err
        })
    },
    editByID : (req,res) =>{
        Comment.findByIdAndUpdate(req.params.commentID,{
            comment : req.body.comment,
            user : req.body.use,
            post : req.body.post
        })
        .then((result) => res.json(result))
        .catch(err =>{
            throw err
        })
    },
    getDatabyID: (req,res) => {
        Comment.findById (req.params.commentID)
        .populate("user","name")
        .populate("post","_id")
        .then ((result) => res.json(result))
        .catch (err => {
            throw err
        }) 

    },
   showCommentPost : (req,res) => {
       const post = req.body.post
       Comment.find({post})
       .then((result)=>res.json(result))
       .catch(err =>{
           throw err
       })
   }
    

}