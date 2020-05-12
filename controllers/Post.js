const Post = require ('../models/Post')



module.exports={

    create:(req,res) => {
        Post.create({
            name: req.body.name,
            description:req.body.description,
            image:req.file && req.file.path,
            tag: req.body.tag,
            tagPlace : {
                namePlace : req.body.namePlace,
                long : req.body.long,
                lat : req.body.lat
            },
            like:req.body.like,

            comment:{
                comment: req.body.comment,
                user: req.body.user
            }
            // date:req.body.date
            
        })
        .then ((response) => res.json(response))
        .catch (err => {
            throw err
        }) 
    },
    getAllData : (req,res) => {
        Post.find ({})
        .populate ("name","name")
        .populate ("tag","name")
        .populate ("like","name")
        .populate ("comment.user","name")
        .populate ({path : "post",populate:{path : "tagPlace"}})
        .then((response) => res.json(response))
        .catch (err => {
            throw err
        }) 
    },

    getDatabyID: (req,res) => {
        Post.findById (req.params.postID)
        .then ((result) => res.json(result))
        .catch (err => {
            throw err
        }) 

    },

    deletebyID : (req,res) => {
        Post.findByIdAndRemove(req.params.postID)
        .then ((result) => res.json(result))
        .catch (err => {
            throw err
        }) 
    },

    editByID : (req,res) =>{
        Post.findByIdAndUpdate(req.params.postID,{
        description:req.body.description,
        image:req.file && req.file.path,
        like:req.body.like,
        comment:req.body.comment,
        // date:req.body.date
        })
        .then((result) => res.json(result))
        .then(err =>{
            throw err
        })
    },

    test : (req,res) => {
        Post.find({})
        .populate('')
        .then((result) => res.json(result))
        .catch(err => {
            throw err
        })
    }
}