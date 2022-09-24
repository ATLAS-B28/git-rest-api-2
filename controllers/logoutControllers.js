const User = require('../model/Users')
//a new handlers
const handleLogOut =async (req,res)=>{
    //on client side and also delete the access token

    const  cookies = req.cookies
    //1st do we habe cookie and then look for jwt
    if(!cookies?.jwt) return res.sendStatus(204) //no content to send back   
    //define refresh cookie 
    const refreshToken = cookies.jwt
  
    //check refresh token in DB

    //go and find the user 
    const foundUser =  await User.findOne({refreshToken}).exec()//here we put exec as we are using await
    //if not found
    if(!foundUser){
        //if not found we can clear the cookie 
        res.clearCookie('jwt',{httpOnly:true})
        return res.sendStatus(204)
    }   
    //we did find the refreshtoken 
    //so delete it
    foundUser.refreshToken = ''
    const result = await foundUser.save()//we save the updated info
    console.log(result);
    res.clearCookie('jwt',{httpOnly:true})

    res.sendStatus(204)

    
}
module.exports = {handleLogOut}
/*const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogOut = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogOut }*/