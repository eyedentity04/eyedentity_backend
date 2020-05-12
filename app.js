var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var logger = require('morgan');
const mongoose = require('mongoose')
var cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken")
const privateKey = "eyedentity"

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/Users');
//var tagRouter = require('./routes/Tag')
var postRouter = require ('./routes/Post')

var app = express();
mongodConnect = process.env.DB_LOCAL_EYEDENTITY;
mongoose.connect(mongodConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.use(cors());
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: false
  })
)
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users',usersRouter);
// app.use('/tag',tagRouter)
app.use('/post',validateUser,postRouter)


function validateUser(req,res,next){
  jwt.verify(req.headers["x-access-token"],privateKey,(err,decoded) => {
    if(err){
      res.json(err)
    }else{
      req.body.userId = decoded.id;
      next()
    }
  })
}

module.exports = app;