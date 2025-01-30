const {format} = require('date-fns');
const {v4:uuid} = require('uuid');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = async (msg, logFile)=>{
   const DateTime = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`;
   const logItem = `${DateTime}\t${uuid()}\t${msg}`;
   try{
       if(!fs.existsSync(path.join(__dirname,'..','logs'))){
        await fsPromises.mkdir(path.join(__dirname,'..','logs'));
       }
       await fsPromises.appendFile(path.join(__dirname,'..','Logs',logFile), logItem + '\n');
   }
   catch(err){
    console.error(err);
   }
}

const Logger = (req,res,next) =>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'requestLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = {Logger, logEvents};