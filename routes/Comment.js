const express = require ('express')
const router = express.Router()
const commentControler = require ('../controllers/Comment')



router.post('/create',commentControler.createComment)
router.delete('/del/:commentID',commentControler.deleteById)
router.get('/show',commentControler.show)
router.put('/edit/:commentID',commentControler.editByID)
router.get('/show/:commentID',commentControler.getDatabyID)
router.get('/find/:targetPostId',commentControler.getCommentByTargetId)



module.exports = router