const Friends = require("../models/Friends");
const mongoose = require("mongoose");

module.exports = {
  addFriends: (req, res ) => {
    let create = () => {
      let condition;
      let update;
  
      if (req.body.usersId) {
        condition = {
          usersId: {
            $eq: mongoose.Types.ObjectId(req.body.usersId),
          },
        };
        update = {
          usersId: req.body.users,
        };
      }
  
      Friends.findOneAndUpdate(
        condition,
        {
          ...update,
          $push: {
            friends: [
              {
                users: req.body.users,
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
        .then((result) => res.json(result))
        .catch((err) => status(400).json(err));
    }
    Friends.findOne({usersId : req.body.usersId})
    .then(result => {
      if(result == null){
        create()
      }else{
        Friends.findOne({"friends.users" : req.body.users})
        .then(response => {
          if(response){
           create()
          }else{
            return res.status(400).json("kamu tidak bisa add temen yang sama ")
          }
        }).catch(err=> status(400).json(err))
      }
    }).catch(err => status(400).json(err))
  },

  // addFriends: (req, res) => {
  //   Friends.findOne({ "friends.users": req.body.users }).then((result) => {
  //     console.log(result);
  //     if (result) {
  //       return res.status(400).json({
  //         friendsAdds: "you have been added this friends in your friends list",
  //       });
  //     } else {
  //       let condition;
  //       let update;

  //       if (req.body.usersId) {
  //         condition = {
  //           usersId: {
  //             $eq: mongoose.Types.ObjectId(req.body.usersId),
  //           },
  //         };
  //         update = {
  //           usersId: req.body.users,
  //         };
  //       }

  //       Friends.findOneAndUpdate(
  //         condition,
  //         {
  //           ...update,
  //           $push: {
  //             friends: [
  //               {
  //                 users: req.body.users,
  //               },
  //             ],
  //           },
  //           $set: {
  //             ...update,
  //           },
  //         },
  //         {
  //           upsert: true,
  //           new: true,
  //         }
  //       )
  //         .then((result) => res.json(result))
  //         .catch((err) => status(400).json(err));
  //     }
  //   });
  // },

  deleteFriends: (req, res) => {
    Friends.findOne({ "friends.users": req.body.users }).then((result) => {
      if (!result) {
        return res
          .status(400)
          .json({ friendsDeleted: "this people is not in your friends list" });
      } else {
        let condition;
        let update;

        if (req.body.usersId) {
          condition = {
            usersId: {
              $eq: mongoose.Types.ObjectId(req.body.usersId),
            },
          };
          update = {
            usersId: req.body.usersId,
          };
        }
        Friends.findOneAndUpdate(
          condition,
          {
            ...update,
            $pull: {
              friends: [
                {
                  users: req.body.users,
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
          .then((result) => res.json(result))
          .catch((err) => status(400).json(err));
      }
    });
  },

  getAllFriends: (req, res) => {
    Friends.find({})
      .populate({ path: "usersId" })
      .populate({ path: "friends.users" })
      .then((result) => res.json(result))
      .catch((err) => status(400).json(err));
  },
};
