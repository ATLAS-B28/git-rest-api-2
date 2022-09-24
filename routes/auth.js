const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
//post the request to authorize
router.post('/',authController.handleLogin)
module.exports = router