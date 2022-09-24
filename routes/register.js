const express = require('express')
const router = express.Router()
const regsiterController = require('../controllers/registerController')
//post the request to authorize
router.post('/',regsiterController.handleNewUser)
module.exports = router