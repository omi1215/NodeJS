console.log("Hello World")

const os = require('os');

console.log(os.type());
console.log(os.homedir());
console.log(os.version());

const path = require('path');

console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));


console.log(__dirname);
console.log(__filename);


const math = require('./math.js')

console.log(math.add(5,5));