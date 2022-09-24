const {logEvents} = require('./logEvents')
const errorHandler = (err,req,res,next)=>{
    logEvents(`${err.name}: ${err.message}`,'errLog.txt')
    console.error(err.stack)
    res.status(500).send(err.message)
}
//create the error log using logEvents and export it
module.exports = errorHandler