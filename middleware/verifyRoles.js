//this is a middleware for verfying roles 
const verifyRoles= (...allowedRoles)=>{//it can accept many roles ,we use rest param to get multiple roles
    return (req,res,next)=>{//we return a middleware func.
        //see if the request is there or not along with the roles
        if(!req?.roles) return res.sendStatus(401)
        const rolesArray = [...allowedRoles]//this arraay has all the allowed roles
        //1st .map() sees for the role in rolesArray and returns true or false
        //2nd  and with find() and returns those with 1st true as value     
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)
        //3rd check for the result is there or not
        if(!result) return res.sendStatus(401)
        next()
    }
}
module.exports = verifyRoles
