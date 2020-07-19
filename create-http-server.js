// http is core node module so it doent need any npm module to add

const http = require('http');

//1) Basic Example
// http.createServer((req,res)=>{
//     res.end('Hello from server')
// }).listen("8000",()=>{
//     console.log("Server started at port 8000");
// });

//####################################################################################
//2) Alternate way by assigning to a local variable
// const server = http.createServer((req,res)=>{
//     res.end('Hello from server')
// });

// server.listen("8000",()=>{
//          console.log("Server started at port 8000");
// });

//########################################################################################

//3) Alternate way to create server through events

const server = http.createServer();

server.on('request',(req,res)=>{
    console.log(req.url);
    console.log('Request Received');
    //setTimeout(()=>{ res.end("Request Received");},10000); 
    res.end("Request Received");
});

//using this approcah we can listen to multiple listners, but we can give only one response at a time
server.on('request',(req,res)=>{
    console.log(req.url);
    console.log('Request Received _1');
    //res.end("Request Received");
});

server.on("close",()=>{    
    console.log('Indicates that the underlying connection was terminated.');
})

server.listen("8000","127.0.0.1",()=>{
         console.log("Server started at port 8000");
});