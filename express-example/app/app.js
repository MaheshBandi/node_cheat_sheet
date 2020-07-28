const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('../routes/tourRoutes');
const path = require('path');

//middleware to read the post boday
app.use(express.json());
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev')); //use morgan  to log the incomming request in the console or log
}


// use the express.static to make public folder, the below index.html can be served at localhost:3000/index.html or localhost:3000
app.use(express.static(path.resolve(`${__dirname}/../public`)));
//sample middleware
app.use((req,res,next)=>{
    console.log('Hello from middleware');
    next();
});
app.use('/api/v1/tours',tourRouter);
module.exports = app;



