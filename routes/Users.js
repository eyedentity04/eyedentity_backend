const express= require('express')
const router = express.Router()
const userControllers = require('../controllers/User')

router.post('/register',userControllers.register)
router.post('/login',userControllers.login)
router.get('/show',userControllers.getUserData)
router.delete('/del/:userId',userControllers.deleteUSerData)
router.put('/edit/:userId',userControllers.editUser)

module.exports = router