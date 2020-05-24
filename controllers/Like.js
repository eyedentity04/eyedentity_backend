const Like = require("../models/Like")
const mongoose = require("mongoose")


module.exports= {
    
    

    createLike : (req,res) => {
    var req
       let condition
       let update
       console.log(req.body.userId)
       if(req.body.targetPostId){
           condition = {
            //    ...condition,
            //    postId : {
                //    $all:[
                //        {
                //            $elemMatch:{
                //                $eq : mongoose.Types.ObjectId(req.body.targetPostId)
                //            }
                //        }
                //    ]
            //    }
            postId: mongoose.Types.ObjectId(req.body.targetPostId)
           }
           update = {
            //    ...update,
               postId : [req.body.targetPostId]
           }
       }
       Like.findOneAndUpdate(
           condition,
           {
               ...update,
               $push:{
                   like:[{userLike: req.body.userId}]
               },
               $set:{
                   ...update
               }
           },
           {
               upsert : true,
               new : true
           }
          
       ).then((response)=>{
           res.json(response)
       })
       .catch((err)=>res.status(400).json(err))



    },
    like:(req,res) =>{
      Like.aggregate([{
        $project:{
          _id : 0,
          postId : 1,
          likes : {$cond: {if : {$isArray : "$like"}, then : {$size : "$like"},else : 0}}
        }
      }])
      .then(result => res.json(result))
      .catch(err => status(400).json(err))
    },

    deleteById : (req,res) => {
        Like.findByIdAndRemove(req.params.likeID)
        .then((result) => res.json(result))
        .catch(err => {
            throw err
        })
    },

    show : (req,res) => {
        Like.find({})
        .populate({path : "userLike"})
        // .populate('post','_id')
        .then((result)=>res.json(result))
        .catch(err =>{
            throw err
        })
    },
    editByID : (req,res) =>{
        Like.findByIdAndUpdate(req.params.likeID,{
            like : req.body.like,
            post : req.body.post
        })
        .then((result) => res.json(result))
        .then(err =>{
            throw err
        })
    },
    showLikePost : (req,res) => {
        const post = req.body.post
        Comment.find({post})
        .then((result)=>res.json(result))
        .catch(err =>{
            throw err
        })
    }

}