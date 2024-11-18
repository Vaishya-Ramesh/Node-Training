const winston=require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports=function(){
    process.on('uncaughtException',(ex)=>{
        console.log('WE GOT AN UNCAUGHT EXCEPTION');
        winston.error(ex.message,ex);
        process.exit(1);
    });
    
    process.on('unhandledRejection',(ex)=>{
        console.log('WE GOT AN UNHANDLED REJECTION');
        winston.error(ex.message,ex);
        process.exit(1);
    });
    
    // const p=Promise.reject(new Error('Something failed miserably!'));
    // p.then(()=>console.log('Done'));

    winston.add(new winston.transports.File({filename:'logfile.log'}));
    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost:27017/vidly',
        level:'info'
    }));
    winston.add(new winston.transports.Console({
        format:winston.format.simple(),
        level:'info'
    }));
}