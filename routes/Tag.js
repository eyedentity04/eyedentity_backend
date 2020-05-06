const express = require('express')
const router = express.Router()
const tagController = require('../controllers/Tag')


// router.post('/create', tagController.createName)
router.get('/tag',tagController.getTagAll)
router.get('/tag/:name',tagController.getTagByName)
// router.put('/edit/:name',tagController.editByName)
// router.delete('/del/:name',tagController.deleteByname)

module.exports = router