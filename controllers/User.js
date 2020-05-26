const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
privateKey = "eyedentity";
require("dotenv").config();

const validatorRegisterInput = require("../validator/Register");
const validateLoginInput =  require('../validator/Login')

module.exports = {

  

  register: (req, res, next) => {
    const { error, isValid } = validatorRegisterInput(req.body);

    if (!isValid) {
      return res
        .status(400)
        .json(error);
    }
    User  
      .findOne({ email: req.body.email })
        .then(user => {
          
          if (user) {
            return res
              .status(400)
                .json({ email: "email is invalid or email is registered" });
                
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  },

  login : ((req,res,next) => {
      const {error,isValid} = validateLoginInput(req.body);
      if(!isValid){
          return res
              .status(400)
              .json(error)
      }
      const email= req.body.email
      const password = req.body.password

      User.findOne({email})
      .then(user => {
          if(!user){
              return res
                  .status(400)
                  .json({emailNotFound : "Email not found or wrong"})
          }
          bcrypt
              .compare(password, user.password)
              .then(isMatch => {
                console.log(password)
                  if(isMatch){
                      const payload = {
                          id : user.id,
                          name : user.name
                      }
                      jwt.sign(payload,process.env.PRIVATE_KEY, {
                          expiresIn : 31556926
                          
                      }, (err,token) => {
                          res.json({
                              success : true,
                              token : token,
                              id : user.id
                          })
                      })

                  }else{
                      return res
                          .status(400)
                          .json({passwordIncorrect: "password incorect"})
                  }
              })
      })
  }),

  // authenticated: function (req,res,next){
  //   User.findOne({
  //     email : req.body.email,
  //     // password :req.body.password
  //   })
  //   .then((response,err)=>{
  //     if(err) next(err);
  //     else {
  //       if(response != null){
  //         bcrypt.compare(req.body.password,response.password,function(
  //           err,
  //           result
  //         ){
  //           jwt.sign(
  //             {id : response._id},
  //             privateKey,
  //             {expiresIn : 60 * 60},
  //             (err,token) =>{
  //               res.json(token)
  //             }
  //           )
  //         })
  //       }else{
  //         res.json({status : err})
  //       }
  //     }
  //   })
  //   .catch((err) => {
  //     throw err
  //   })
  // },

  getUserData: (req, res) => {
    User.find()
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },

  deleteUSerData: (req, res) => {
    User.findByIdAndRemove(req.params.userId)
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },

  editUser: (req, res) => {
    userId = req.params.userId;
    User.findById(userId)
      .then((result) => {
        User.findByIdAndUpdate(
          userId,
          {
            username: req.body.username || result.username,
            about: req.body.about || result.about,
            image: (req.file && req.file.path) || result.image,
            backGroundImage : (req.file && req.file.path) || result.backGroundImage
          },
          {
            new: true,
          }
        )
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  },
  
  findUserbyId : (req,res) =>{
    User.findById(req.params.userId)
    .then((response) => res.json(response))
    .catch(err => {
      throw err
    })
  },
  findUserQuery : (req,res) => {
    const name = new RegExp(req.query["name"],"i")
    User.find({name})
    .select('-password')
    .then((result) => res.json(result))
    .catch(err =>{
      throw err
    })
  },
  findUserBody : (req,res) => {
    const name = new RegExp(req.body["name"],"i")
    User.find({name})
    .select('-password')
    .then((result) => res.json(result))
    .catch(err =>{
      throw err
    })
  },
  
  

};
