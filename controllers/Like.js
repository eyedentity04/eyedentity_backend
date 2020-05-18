const Like = require("../models/Like") 


module.exports= {
    
    // createLike : (req,res) => {
    //     Like.findOne({user : req.body.user})
    //     .then(result => {
    //         console.log({user : req.body.user})
    //         if(result){
    //             return res
    //                 .status(400)
    //                     .json({user : "you can not like double"})
    //         }else{
    //            const newLike = new Like({
    //                user : req.body.user,
    //                post : req.body.post
    //            })
    //            newLike
    //             .save()
    //             .then((result)=> res.json(result))
    //             .catch(err => {
    //                 throw err
    //             })
    //         }
    //     })
    // },

    createLike : (req,res) => {
        Like.create({
            like : req.body.like,
            post : req.body.post
        })
        .then((result)=> res.json({
            status : "succes",
            result : result,
            postID : result.post,
            likeID : result.id
        }))
        .catch(err => {
            throw err
        })
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
        .populate("like","name")
        .populate('post','_id')
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