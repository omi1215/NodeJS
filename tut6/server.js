const path = require('path');
const express = require('express');
const {Logger} = require('./middleware/logEvents');
const app = express();
const cors = require('cors');
const { error } = require('console');
const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({extended:false})); //built-in middle-ware for form data.
app.use(express.json()); //built-in middle-ware for JSON
app.use(express.static(path.join(__dirname,'public'))); //built-in middle-ware for public assets

app.use(Logger);

const whiteList = ['https://www.google.com', 'http://127.0.0.1:5500','http://localhost:3500'];
const corsOptions = {
    origin : (origin, callback)=>{
        if(whiteList.indexOf(origin) != -1 || !origin){
            callback(null,true);
        }
        else{
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSucessStatus : 200
} 

app.use(cors(corsOptions));
app.get('^/$|/index(.html)?',(req, res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
})

app.get('/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'));
})

app.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301, '/new-page.html');
})

app.get('/hello(.html)?',(req,res,next)=>{
    console.log("Serving Hello World.");
    next();
},(req,res)=>{
    res.send('Hello World!');
})

const one = (req,res,next)=>{
    console.log("Serving One;");
    next();
}

const two = (req,res,next)=>{
    console.log("Serving two;");
    next();
}

const three = (req,res,next)=>{
    res.send("Finished");
}

app.get('/chain',[one,two,three]);

app.all('*',(req,res)=>{
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    }
    else if(req.accepts('json')){
        res.json({error:"404 Not Found."});
    }
    else{
        res.type('txt').send('404 Not Found.')
    }
    
    
})

app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(404).send(err.message);
})
app.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`);
});


