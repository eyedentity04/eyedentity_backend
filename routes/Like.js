const express = require ('express')
const router = express.Router()
const likeControler = require ('../controllers/Like')



router.post('/create',likeControler.createLike)
router.delete('/del/:likeID',likeControler.deleteById)
router.get('/show',likeControler.show)
router.put('/edit/:likeID',likeControler.editByID)
router.get('/find',likeControler.showLikePost)
router.get('/like',likeControler.like)
router.get('/count/:targetPost',likeControler.Hitung)


module.exports = router