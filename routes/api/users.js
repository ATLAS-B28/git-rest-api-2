//using this we will alos be able to get ,delete other non-admin users also 
const express = require('express')
const router = express.Router()
const userController = require('../../controllers/usersController')
const ROLES_LIST = require('../../config/rolesList')
const verifyRoles = require('../../middleware/verifyRoles')
router.route('/')
   .get(verifyRoles(ROLES_LIST.Admin),userController.getAllUsers)
   .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser)

router.route('/:id')
      .get(verifyRoles(ROLES_LIST.Admin), userController.getUser)
    
module.exports = router