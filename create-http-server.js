// http is core node module so it doent need any npm module to add

const http = require('http');

http.createServer((req,res)=>{
    res.end('Hello from server')
}).listen("8000",()=>{
    console.log("Server started at port 8000");
});