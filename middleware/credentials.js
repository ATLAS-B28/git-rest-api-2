const allowedOrigins = require('../config/allowedOrigins')
const credentials = (req,res,next)=>{
    const origin = req.headers.origin
   if(allowedOrigins.includes(origin)){
    res.header('Access-Control-Allow-Credentials')
   }
   next()
}
//create the error log using logEvents and export it
module.exports = credentials