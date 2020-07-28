const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path:path.resolve(`${__dirname}/config/config.env`)});

const app = require('./app/app');
//console.log(process.env);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App started at port ${port}`);
});


