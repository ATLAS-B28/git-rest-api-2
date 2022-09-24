const express  = require('express')
const router = express.Router()
const refreshTokenController = require('../controllers/RTController')
router.get('/',refreshTokenController.handleRefreshToken)
module.exports = router