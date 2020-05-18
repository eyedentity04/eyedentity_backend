const Comment = require("../models/Comment") 


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

    createComment : (req,res) => {
       Comment.create({
           comment : req.body.comment,
           user : req.body.user,
           post : req.body.post
       }).then((result) =>res.json(result))
       .catch(err =>{
           throw err
       })
        
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