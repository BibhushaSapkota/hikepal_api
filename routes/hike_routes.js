const express = require('express')
const hikeController = require('../controllers/hike_controller')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')
const router = express.Router()


router.route('/')
        .get(hikeController.gethike)
        .post(auth.verifyUser,upload.single('image'), hikeController.addhike)

router.route('/:id')
        .get(hikeController.gethikeByUser)
        .delete(hikeController.deletehike)

router.route('/hike/:id')
        .get(hikeController.gethikeByHike)
        


module.exports = router
