const express = require('express')
const router = express.Router()

//we will bring in our controllers
const employeesController = require('../../controllers/employeesControls')
const ROLES_LIST = require('../../config/rolesList')
const verifyRoles = require('../../middleware/verifyRoles')
//We simulate an a.p.i here and CRUD operations 
//this is for the route
router.route('/')//then we can chain diff. http methods
      .get(employeesController.getAllEmployees)//here before the controller so that it goes to middelware first then to the controller
      .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeesController.createNewEmployee)      
      .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeesController.updateEmployee)
      .delete(verifyRoles(ROLES_LIST.Admin),employeesController.deleteEmployee)
 //here we chain the http methods
//we can have a param directly in the url
router.route('/:id')
       .get(employeesController.getEmployee)
/*router.route('/:firstname')
      .get((req,res)=>{
        res.json({"firstname":req.params.firstname})

      })*/
module.exports = router