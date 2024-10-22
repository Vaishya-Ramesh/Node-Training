const startupDebugger=require('debug')('app:startup');
const dbDebugger=require('debug')('app:db');

const config=require('config');
const Joi=require('joi');
const helmet=require('helmet');
const morgan=require('morgan');
const logger=require('./logger');
const courses=require('./routes/courses');
const home=require('./routes/home');
const express=require('express');
const app=express();

//console.log(`Node env: ${process.env.NODE_ENV}`);
//console.log(`App Enviroinment: ${app.get(`env`)}`);

app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses',courses);
app.use('/',home);
/*
console.log(`Application name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);
*/

if(app.get('env')==='development')
{
    app.use(morgan('tiny'));
    startupDebugger("Morgan enabled");
}

dbDebugger('Connecting to Database...');

app.use(logger.log);
app.use(logger.auth);

/*
app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.query);
});
*/

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening to port ${port}..`));