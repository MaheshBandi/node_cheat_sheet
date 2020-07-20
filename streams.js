const fs = require('fs');
const server = require('http').createServer();

// example to write a file using streams
let writeStream = fs.createWriteStream('sample_text.txt');

for (let index = 0; index < 10000; index++) {
    writeStream.write(`sample data ${index} \n`);   
}
// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {
    console.log('wrote all data to file');
});
// close the stream
writeStream.end();


server.on('request',(req,res)=>{
//solution1 read all the data to memory and write to output stream .
        /*fs.readFile("sample_text.txt",(err,data)=>{
            if(err)console.log(err);
            res.end(data);
        })*/

   
//soultion2 read the data using the stream and write to the output stream. This may lead to back pressure problem as if input steam is faster than outstream(as we are writing to network)
    /*let readStream = fs.createReadStream('sample_text.txt'); 
    readStream.on('data',(chunk)=>{
        res.write(chunk);
    });
    readStream.on('end',()=>{
        console.log("end is called");
        res.end();
    }); */
//solution3 This is most efficent solution by using the pipe
let readStream = fs.createReadStream('sample_text.txt');
readStream.pipe(res);
readStream.on('end',()=>{
    console.log("end is called");
    res.end();
});

})

server.listen(8000,"localhost",()=>{
    console.log("Listening on port 8000");
});
