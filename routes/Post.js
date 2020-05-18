const express = require ('express')
const router = express.Router()
const postController = require ('../controllers/Post')
const multer = require ("multer")

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

router.post("/create",upload.single("image"),postController.create)
router.get("/show",postController.getAllData)
router.get("/show/:postID/",postController.getDatabyID)
router.delete("/delete/:postID",postController.deletebyID)
router.put("/edit/:postID",upload.single("image"),postController.editByID)
router.get('/test',postController.getAllDataTest)


router.get("/test",postController.test)

module.exports = router