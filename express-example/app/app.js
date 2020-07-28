const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('../routes/tourRoutes');
//middleware to read the post boday
app.use(express.json());
app.use(morgan('dev')); //use morgan  to log the incomming request in the console or log

//sample middleware
app.use((req,res,next)=>{
    console.log('Hello from middleware');
    next();
});
app.use('/api/v1/tours',tourRouter);
module.exports = app;



