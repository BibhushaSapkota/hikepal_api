const express = require('express')
const auth = require('../middleware/auth')
const userController = require('../controllers/user_controller')
const uploadOptions = require('../middleware/uploaduser')
const router = express.Router()


router.route('/login')
    .post(userController.loginuser)

router.route('/register')
    .post(uploadOptions.single('image'),userController.registeruser)

router.route('/:id')
    .get(auth.verifyUser,userController.getUserByID)
    .put(auth.verifyUser, uploadOptions.single('image'),userController.updateUserByID)

router.route('/password/:id')
    .put(auth.verifyUser,userController.changePassword)


module.exports = router