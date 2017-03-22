var express = require('express');
var path =  require('path');
var bodyParser = require('body-parser');

//route the application 
var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 3000;
//global app variable
var app =express();

//view engine 
app.set('client/dist',path.join(__dirname,'client/dist'));
app.set('view engine','ejs');
//render file with html extention
app.engine('html',require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname,'client/dist')));

//Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented:true}));

app.use('/',index);
app.use('/api',tasks);

app.listen(port,function(){
    console.log("server started on "+port)
});

