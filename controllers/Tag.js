const Tag = require("../models/Tag");

module.exports = {
  
  getTagAll : (req,res) => {
    Tag.find({})
    .populate("tag")
    .then((result) => res.json(result))
    .catch(err => {
      throw err
    })
  },

  getTagByName : (req,res) => {
    Tag.findOne({name : req.params.name})
    .populate("tag")
    .then((result) => res.json(result))
    .catch(err => {
      throw err
    })
  }
  // createName: (req,res) => {
  //   Tag.create({
  //       name :req.body.name
  //   })
  //   .then((result) => res.json(result))
  //   .catch(err => {
  //       throw err
  //   })
  // },

  // getTagByName: (req, res) => {
  //   Tag.findOne({name : req.params.name})
  //     .then((result) => res.json(result))
  //     .catch((err) => {
  //       throw err;
  //     });
  // },

  // getTagAll: (req, res) => {
  //   Tag.find({})
  //     .then((result) => res.json(result))
  //     .catch((err) => {
  //       throw err;
  //     });
  // },

  // editByName: (req, res) => {
  //   Tag.findOneAndUpdate(req.params.name, {
  //     name: req.body.name,
  //   })
  //     .then((result) => res.json(result))
  //     .catch((err) => {
  //       throw err;
  //     });
  // },
  // deleteByname: (req, res) => {
  //   Tag.findOneAndRemove(req.params.name)
  //     .then((result) => res.json(result))
  //     .catch((err) => {
  //       throw err;
  //     });
  // },

  // createPlace: (req, res) => {
  //   Tag.create({
  //     name: req.body.name,
  //     long: req.body.long,
  //     lat: req.body.lat,
  //   })

  //     .then((result) => res.json(result))
  //     .catch((err) => {
  //       throw err;
  //     });
  // },
};
