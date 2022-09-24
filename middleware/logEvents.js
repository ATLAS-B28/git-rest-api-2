// for server.js
const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const fsPromises  = require('fs').promises
const path = require('path')

//logEvents function
//an async function
const logEvents= async (message,logName)=>{
    //1st we log event i.e. get time and a message
    const dateTime = `${format(new Date(),"yyyyMMdd\tHH:mm:ss")}`
    //then get unique uuid for each log event
   const logItem = `${dateTime}\t${uuid()}\t${message}\n`
   console.log(logItem);
   //async await portion of the function
   try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }

    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
} catch (err) {
    console.log(err);
}
}
const logger = (req,res,next)=>{ 
                    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqlog.txt')//2 params-> message and file to which it writes or creates
                    console.log(`${req.method} ${req.path}`);
                    next()
                }


module.exports ={ logger,logEvents}
