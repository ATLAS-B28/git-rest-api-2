//refresh token
const User = require('../model/Users')
const jwt = require('jsonwebtoken')

//a new handlers
const handleRefreshToken = async (req,res)=>{
    const  cookies = req.cookies
    //1st do we habe cookie and then look for jwt
    if(!cookies?.jwt) return res.sendStatus(401)    
   
    //define refresh cookie 
    const refreshToken = cookies.jwt
    //go and find the user with the refresh token
    const foundUser = await User.findOne({refreshToken}).exec()//here we put exec as we are using await
    //if not found
    if(!foundUser) return res.sendStatus(403)//forbidden
    //eval the jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECERT,
        (err,decoded)=>{
             if(err || foundUser.username !== decoded.username) return res.sendStatus(403)
             //as everything is fine then the a new access token is created as refersh token is verified now
             const roles = Object.values(foundUser.roles)
             const accessToken = jwt.sign(
                {
                    "UserInfo":
                            {
                                "username":decoded.username,
                                "roles":roles
                            }
                },
                process.env.ACCESS_TOKEN_SECERT,
                {expiresIn:'60s'}
             )
             res.json({ roles ,accessToken })
        }
        
    
    )
    
}
module.exports = {handleRefreshToken}
/*const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECERT,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECERT,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }*/