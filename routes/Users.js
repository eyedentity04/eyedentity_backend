const express= require('express')
const router = express.Router()
const userControllers = require('../controllers/User')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req,res,cb){
        cb(null, "./public/images" )
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString()+file.originalname)
    },
})

const upload = multer({
    storage : storage
})


router.post('/register',userControllers.register)
router.post('/login',userControllers.login)
router.get('/show',userControllers.getUserData)
router.delete('/del/:userId',userControllers.deleteUSerData)
router.put('/edit/:userId',upload.single('images'),userControllers.editUser)
router.get('/findBody',userControllers.findUserBody)
router.get('/findQuery',userControllers.findUserQuery)

module.exports = router