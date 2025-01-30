const fs = require('fs');

// fs.readFile("D:/Web/NodeJS/tut2/data.txt",(err,data)=>{
//     if(err) throw err;
//     console.log(data.toString());
// })

// process.on('uncaughtException', err => {
//     console.error(`Caught an error : ${err}`);
//     process.exit(1);
// })

// const path = require('path');
// fs.readFile(path.join(__dirname,'data.txt'),(err,data)=>{
//     if(err) throw err;
//     console.log(data.toString());
// })

// process.on('uncaughtException', err => {
//     console.error(`Caught an error : ${err}`);
//     process.exit(1);
// })

// fs.writeFile(path.join(__dirname,'data2.txt'),"Hello I'm the new File",(err,data)=>{
//     if(err) throw err;
//     console.log("Write Complete! :)");
// })

// process.on('uncaughtException', err => {
//     console.error(`Caught an error : ${err}`);
//     process.exit(1);
// })

// fs.appendFile(path.join(__dirname,'data2.txt')," \n Hello there new File, how are you?",(err,data)=>{
//     if(err) throw err;
//     console.log("append Complete! :)");
// })

// process.on('uncaughtException', err => {
//     console.error(`Caught an error : ${err}`);
//     process.exit(1);
// })

const fsPromises = require('fs').promises;
const path = require('path'); // Import the path module

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile('./data.txt', 'utf-8'); 
    console.log(data); 

    await fsPromises.writeFile(path.join(__dirname, './data2.txt'), "We meet again!"); 
    console.log("Write Complete!");

    await fsPromises.appendFile(path.join(__dirname, './data2.txt'), "\n Nice to meet you again!");
    console.log("Appended Complete!");

  } catch (err) {
    console.error(err);
  }
};

fileOps();