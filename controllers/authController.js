//auth the registered user
const User = require('../model/Users')
const crypt = require('bcrypt')//here we use async await with bcrypt
const jwt = require('jsonwebtoken')

//a new handlers
const handleLogin = async (req,res)=>{
    const {user,pwd} = req.body
    if(!user|| !pwd) return res.status(400).json({"message":"Username and password are required"})
    //go and find the user 
    const foundUser = await User.findOne({username:user}).exec()//here we put exec as we are using await
    //if not found
    if(!foundUser) return res.sendStatus(401)//unauthorized
    //eval the password
    const match = await crypt.compare(pwd,foundUser.password)
    //if there
    if(match){//here we wanna grab roles
        const roles = Object.values(foundUser.roles).filter(Boolean)
        //create JWTs here
        //so now create them
        const accessToken = jwt.sign(
            {
                "UserInfo":
                        {
                            "username":foundUser.username,
                            "roles":roles
                        }
            },
            process.env.ACCESS_TOKEN_SECERT,
            {
                expiresIn:'60s'
            }
        )
        const refreshToken = jwt.sign(
            {
                "username":foundUser.username
            },
            process.env.REFRESH_TOKEN_SECERT,
            {
                expiresIn:'1d'
            }
        )//1st is to pass in a payload ,here username object and not other sensitive info
        //now we have to store our refresh token in database that will allow us to have a logout route
        //so as to invalidate the user in the future
        //saving refreshToken with current user ,this is for cross refernce
       foundUser.refreshToken = refreshToken
       const result =  await foundUser.save()
       console.log(result);
       console.log(roles);
        res.cookie('jwt',refreshToken,{httpOnly:true,maxAge: 24* 60* 60* 1000})//cookie name -> jwt
      //we must store access token in the memory and not the local storage
       res.json({accessToken})
    }else{
        res.sendStatus(401)
    }
}
module.exports = {handleLogin}