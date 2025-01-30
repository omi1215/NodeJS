const {format} = require('date-fns');
const {v4:uuid} = require('uuid');
console.log(uuid());
console.log(format(new Date(),'yyyyMMdd\tHH:mm:ss'))

const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = async (msg)=>{
   const DateTime = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`;
   const logItem = `${DateTime}\t${uuid()}\t${msg}`;
   try{
       if(!fs.existsSync(path.join(__dirname,'logs'))){
        await fsPromises.mkdir(path.join(__dirname,'logs'));
       }
       await fsPromises.appendFile(path.join(__dirname,'Logs','EventLogs.txt'), logItem);
   }
   catch(err){
    console.error(err);
   }
}

module.exports = logEvents;