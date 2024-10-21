/*
const l=require('./logger');
l.print('to Workhall');
l.sayHello();

-----------------Using BuiltIn modules-----------------------------

const pathConst=require('path');
var pathObj=pathConst.parse(__filename);
console.log(pathObj);


const osConst=require('os');
var tm=osConst.totalmem();
var fm=osConst.freemem();
console.log(`Total Memory: ${tm}\nFree Memory: ${fm}`);

---------------------Using Files------------------------------------ 

const fileConst=require('fs');

//Synchronous
//const files=fileConst.readdirSync('./'); // Shows all the files in the current directory
//console.log(files);

//Asynchronous
fileConst.readdir('./',function(err,files){
    if(err)
    {
        console.log(`Error: ${err}`);
    }
    else
    {
        console.log(`Result: ${files}`);
    }
});

--------------------------Events----------------------------------
 
const EventEmitter=require('events');
const emitter=new EventEmitter();

emitter.on("Message Logged",function()
{
    console.log("Listener called");
});
emitter.emit("Message Logged");

-------------------------HTTP Module--------------------------------
*/
const http=require('http');
//const server=http.createServer();
//server.on("connection",(socket)=>{
//    console.log("New Connection");
//});
const server=http.createServer((req,res)=>{
    if(req.url=='/')
    {
        res.write('Hello World');
        res.end();
    }
})
server.listen(3000);
console.log('Listening on port 3000..');