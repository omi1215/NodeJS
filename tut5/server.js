const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3500;

app.get('^/$|/index(.html)?',(req, res)=>{
    res.sendFile(path.join(__dirname,'views','subdir','index.html'));
})

app.get('/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','subdir','new-page.html'));
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

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','subdir','404.html'));
})

app.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`);
});


