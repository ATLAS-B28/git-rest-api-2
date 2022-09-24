const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization
    //check to see if it is received or not in a correct form
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)//if the auth header is there with starts with 'bearer'
  
    //define that token
    const token = authHeader.split(' ')[1]
    //verify the token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECERT,
        (err,decoded)=>{//decoded info from jwt, and err
             if(err) return res.sendStatus(403)//something was not right of the token and therefore an invalide token was received
             req.user = decoded.UserInfo.username//decoded.username//set user to decoded username that we sent in to jwt
             req.roles= decoded.UserInfo.roles
             next()
        }
    )
}
module.exports = verifyJWT