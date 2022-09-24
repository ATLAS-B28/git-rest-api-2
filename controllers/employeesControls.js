//mvc rest api logic here
//controller will have all the logic of the crud operation 
//which is then exported to routes/api folder
//here we pull in the data
const Employees = require('../model/Employees')

const getAllEmployees = async (req,res)=>{
    const employees = await Employees.find()
    //if not
    if(!employees) return res.status(204).josn({'message':'No employee found'})
    //there is a employee
    res.json(employees)
}
const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }

    try {
        const result = await Employees.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}
const updateEmployee = async (req,res)=>{
    if(!req?.body?.id){
        return res.status(400).json({'message':'ID parameter is required'})
    }
    //find the employee
    const employees = await Employees.findOne({_id:req.body.id}).exec()
    //if id of employees is not found
    if(!employees) {
        return res.status(204).json({'message':`No employees matches ID${req.body.id}`})//matching id is not found
    }
    //if found set the udpated first and last names to the array
    if(req.body?.firstname) employees.firstname = req.body.firstname
    if(req.body?.lastname) employees.lastname = req.body.lastname
    
    const result = await employees.save()
    res.json(result)
}
const deleteEmployee = async (req,res)=>{
    //if we receive an id as parameter then we find that id using find()
    //const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    //if id not there
    if(!req?.body?.id) return res.status(400).json({'message':'Employee ID required'})
    const employees = await Employees.findOne({_id:req.body.id}).exec()
    if(!employees){
        return res.status(204).json({"message":`No employee matches ID ${req.body.id}`})
    }
    const result = await employees.deleteOne()//_id:req.body.id
    res.json(result)
    
}
const getEmployee = async (req,res)=>{
      //getting the record of one employee
      //if we receive an id as parameter then we find that id using find()
    if(!req?.params?.id) return res.status(400).json({'message':'Employee ID required'})
      const employees = await Employees.findOne({_id:req.params.id}).exec()
    //old version->data.employees.find(emp => emp.id === parseInt(req.body.id))
    //if id not there
    if(!employees){
        return res.status(400).json({"message":`No employee matches ID ${req.params.id}`})
    }
    res.json(employees)
}
module.exports = {
                  getAllEmployees,
                  createNewEmployee,
                  updateEmployee,
                  deleteEmployee,
                  getEmployee
}