const path = require('path');
const express = require('express');
const {Logger} = require('./middleware/logEvents');
const app = express();
const cors = require('cors');
const { error } = require('console');
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({extended:false})); //built-in middle-ware for form data.
app.use(express.json()); //built-in middle-ware for JSON


app.use(Logger);
app.use(cors(corsOptions));

// serve static files
app.use('/',express.static(path.join(__dirname,'/public'))); //built-in middle-ware for public assets

// routes
app.use('/',require('./routes/root'))
// How to setup a RESTAPI : START
app.use('/employees',require('./routes/api/employees'));

// How to setup a RESTAPI : END
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


