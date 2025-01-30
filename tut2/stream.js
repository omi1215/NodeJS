const fs = require('fs');
const path = require('path');
const rs = fs.createReadStream(path.join(__dirname,'data2.txt'), {encoding: 'utf8'});
const ws = fs.createWriteStream('./newData.txt');

// rs.on('data', (dataChunk)=>{
//     ws.write(dataChunk);
// })

rs.pipe(ws);