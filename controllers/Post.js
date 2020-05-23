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
            // like:req.body.like,
            // comment: req.body.comment,

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
        // .populate ("like")
        .populate ({path : "comment"})
        .populate ({path : "post",populate:{path : "tagPlace"}})
        .then((response) => res.json(response,))
        .catch (err => {
            throw err
        }) 
    },

    getAllDataTest : (req,res) => {
        Post.find({})
        .sort({date : 'desc'})
        .populate ("name","name")
        .populate ("tag","name")
        // .populate("comment")
        // .populate ("like","name")
        // .populate ("comment.user","name")
        .populate ({path : "post",populate:{path : "tagPlace"}})
        .then((response) => res.json(response))
        .catch(err => {
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
        tag: req.body.tag,
            tagPlace : {
                namePlace : req.body.namePlace,
                long : req.body.long,
                lat : req.body.lat
            },
        // like:req.body.like,
        // comment:req.body.comment,
        // date:req.body.date
        })
        .populate ("name","name")
        .populate ("tag","name")
        .then((result) => res.json(result))
        .then(err =>{
            throw err
        })
    },

    showUserPost : (req,res) => {
        const name = req.body.name
        Post.find({name})
        .populate ("name","name")
        .populate ("tag","name")
        .then((response) => res.json(response))
        .catch(err => {
            throw err
        })
    },
    // showUserPostById : (req,res) => {
    //     Post.findById(req.params.userId)
    //     .then((result)=>{
    //         res.json(result)
    //     })
    //     .catch((err) => res.json(err))
    // },
    // showUserPostQuery : (req,res) => {
    //     const user = new RegExp(req.query["name"],"i")
    //     Post.find({user})
    //     .populate ("name","name")
    //     .populate ("tag","name")
    //     .then((result) => res.json(result))
    //     .catch(err => {
    //         throw err
    //     })
    // }
}