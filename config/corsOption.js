
const allowedOrigins = require('./allowedOrigins');
//for cors to a give this access to the domain
//for that we create afunction

const corsOptions = {
    origin:(origin,callback)=>{//origin is the who requested it
        if(allowedOrigins.indexOf(origin)!== -1 || !origin){//i.e if not origin then also for undefined which does give false value 
            //if domain is in the whitlist
            callback(null,true)//null-> no error, true-> Yes its the same orirign so allow it
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200
}
 module.exports  = corsOptions