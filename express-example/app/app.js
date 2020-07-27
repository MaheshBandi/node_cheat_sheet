const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

//middleware to read the post boday
app.use(express.json());

// app.get('/',(req,res)=>{
//     //res.status(200).send('Hello from server side!');
//     // or send json directly
//     res.status(200).json({message:'Hello from the server side !'});

// })

const dirPath = path.join(__dirname, '../helpers/data/tours-simple.json');
console.log(dirPath);
const tours = JSON.parse(fs.readFileSync(dirPath));
//console.log(tours.length);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  //console.log(req.params);
  const id = req.params.id * 1; // use this trick to convert string to int
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

//By Default the data for post is not available in the req. we need to use a middleware  express.json()
const createTour = (req, res) => {
  //console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  //const newTour=  Object.assign({id:newId},req.body);
  //or use Es6 Spread Operator
  const newTour = { id: newId, ...req.body };
  //tours.push(newTour);
  const updatedTour = [...tours, newTour];
  fs.writeFile(dirPath, JSON.stringify(updatedTour, null, 2), (err) => {
    if (err) return console.log(err);
    res.status(201).json(newTour);
  });
};

const updateTour = (req, res) => {
  const id = req.params.id * 1; // use this trick to convert string to int
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  const tour = tours.find((el) => el.id === id);
  const updatedTour = { ...tour, ...req.body };
  tours[id] = updatedTour;
  fs.writeFile(dirPath, JSON.stringify(tours, null, 2), (err) => {
    if (err) return console.log(err);
    res.status(204).json(updatedTour);
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1; // use this trick to convert string to int
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }

  const filterItems = tours.filter((el) => el.id != id);
  console.log(filterItems);

  fs.writeFile(dirPath, JSON.stringify(filterItems, null, 2), (err) => {
    if (err) return console.log(err);
    res.status(204).json({});
  });
};
app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id/:optionalParam?', getTour); //use ? to specify the optional params
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);
const port = 3000;
app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
