//user auth using jwt 
//jwt issued after the initial auth of user
//there are 2 things given after login to a user
//1st is access token for short term access
//and refresh token for long term access before it is expires
//our rest api will send and receive access tokens as json data 
//this tokens must not be stored in localstorage
//and the refresh token is http only cookie so JS cannot be used for accessing it
//it is verified with middleware
//the refresh token is issued during auth and verfired by endpoint and database
//creating routes with express router
require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors= require('cors')
const cookieParser = require('cookie-parser')
const {logger} = require('./middleware/logEvents')
const corsOptions = require('./config/corsOption')
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const errorHandler = require('./middleware/errorHandling')
const PORT = process.env.PORT || 3500
//connect to db
connectDB()
// custom middleware logger->
//we can make this routes into separate routers,
//eseentially working as mini servers for specific route or mini-app 
app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))


// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended:false}))

// built-in middleware for json 
app.use(express.json())
//middleware for cookies
app.use(cookieParser())
//serving static files
app.use('/',express.static(path.join(__dirname,'/public')))
//routes->
//in new versions app.use does have regex support
//here this router will superced the subdir router
//all the routes go to this but now we donot do that
//app.use('/*',require(''))
//this route is for root directory//

app.use('/',require('./routes/root'))
//add routes to register nad login
app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))

//before we verify the new jwt
//the refresh route will receive cookie which has refresh token
app.use('/refresh',require('./routes/refresh'))
app.use('/logout',require('./routes/logout'))
//then this will issue an access token using the verifyJWT route
//before employee we put jwt after resgister and auth
app.use(verifyJWT)
app.use('/employees',require('./routes/api/employees'))
app.use('/users',require('./routes/api/users'))
//error handling
app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
    res.sendFile(path.join(__dirname,'views','404.html'))
    }
    else if(req.accepts('json')){
        res.json({error:"404 page not found"})
    }else{
        res.type('txt').send("404 not found")
    }
})



app.use(errorHandler)





//should be at the end 
mongoose.connection.once('open',()=>{
    console.log('connected to mongoDb');
    //if connection happens
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
})
