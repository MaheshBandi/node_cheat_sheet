// http is core node module so it doent need any npm module to add

const http = require('http');


// http.createServer((req,res)=>{
//     res.end('Hello from server')
// }).listen("8000",()=>{
//     console.log("Server started at port 8000");
// });

//Alternate way by assigning to a local variable
const server = http.createServer((req,res)=>{
    res.end('Hello from server')
});

server.listen("8000",()=>{
         console.log("Server started at port 8000");
});