const express = require('express')
const jhikeController = require('../controllers/jhike_controller')
const auth = require('../middleware/auth')
const router = express.Router()

router.route('/')
        .get(jhikeController.getJhike)
        .post(auth.verifyUser, jhikeController.addJhike)

router.route('/user/:id')
        .get(jhikeController.getJhikeByUser)
        .delete(jhikeController.clearJhike)

router.route('/:id')
        .delete(auth.verifyUser,jhikeController.deleteJhikeItem)

router.route('/hike/:id')
        .get(jhikeController.getJhikeByHike)

module.exports = router
        
