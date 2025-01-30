const logEvents = require('./logEvents');
const EventEmitter = require('events');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const http = require('http');
const { url } = require('inspector');
const { json } = require('stream/consumers');

class Emitter extends EventEmitter {};
const myEmitter = new Emitter();

myEmitter.on('log',(msg, fileName)=> logEvents(msg,fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath,ContentType, response)=>{
    try {
        const rawData = await fsPromises.readFile(filePath, !ContentType.includes('image') ? 'utf8' : '');
        const data = ContentType === 'application/json' ? JSON.parse(rawData) : rawData;
        response.writeHead(filePath.includes(404) ? 404 : 200, {'Content-Type' : ContentType});
        response.end(ContentType === 'application/json' ? JSON.stringify(data) : data);
    }
    catch (err){
        console.error(err);
        myEmitter.emit('log',`${err.name}: ${err.message}`,'errorLog.txt')
        response.statusCode = 500;
        response.end();
    }
}
const server = http.createServer((req,res)=>{
    console.log(req.url, req.method);
    myEmitter.emit('log',`${req.url}\t${req.method}`,'requestLog.txt')
    const extension = path.extname(req.url);

    let ContentType;

    switch(extension){
        case '.css':
            ContentType = 'text/css';
            break;
        case '.js':
            ContentType = 'text/javascript';
            break;
        case '.json':
            ContentType = 'application/json';
            break;
        case '.jpg':
            ContentType = 'image/jpeg';        
            break;
        case '.png':
            ContentType = 'image/png';
            break;
        case '.txt':
            ContentType = 'text/plain';
            break;
        default:
            ContentType = 'text/html';
    }

    let filePath = 
    ContentType === 'text/html' && req.url === '/' ? path.join(__dirname,'views','subdir','index.html') :
    ContentType === 'text/html' && req.url.slice(-1) === '/' ? path.join(__dirname,'views','subdir',req.url,'index.html'):
    ContentType === 'text/html' ? path.join(__dirname,'views','subdir',req.url) :
    path.join(__dirname,req.url);

    if (!extension && req.url.slice(-1) !== '/'){
        filePath += '.html';
    }
    const fileExists = fs.existsSync(filePath);
    if(fileExists){
        serveFile(filePath,ContentType,res); 
    }
    else{
        switch(path.parse(filePath).base){
            case 'old-page.html':
                console.log(path.parse(filePath).base);
                res.writeHead(301,{'Location': '/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                console.log(path.parse(filePath).base);
                res.writeHead(301, {'Location' : '/'});
                res.end();
                break;
            default:
            serveFile(path.join(__dirname,'views','subdir','404.html'),'text/html',res); 
        }
    }
})

server.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`);
});


