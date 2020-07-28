const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '../helpers/data/tours-simple.json');
const tours = JSON.parse(fs.readFileSync(dirPath));


exports.sampleMiddleWare = (req,res,next)=>{
  console.log('sample middleware');
  next();
}
exports.checkId = (req,res,next,value)=>{
  const id = req.params.id * 1; // use this trick to convert string to int
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  next();
}


exports.checkBody = (req,res,next)=>{
if(!req.body.name || !req.body.price){
 return res.status(400).json({
  status: 'failed',
  message: 'Missing name or price',
 });
}
next();
}
 exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1; // use this trick to convert string to int
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  const updatedTour = [...tours, newTour];
  fs.writeFile(dirPath, JSON.stringify(updatedTour, null, 2), (err) => {
    if (err) return console.log(err);
    res.status(201).json(newTour);
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1; // use this trick to convert string to int  
  const tour = tours.find((el) => el.id === id);
  const updatedTour = { ...tour, ...req.body };
  tours[id] = updatedTour;
  fs.writeFile(dirPath, JSON.stringify(tours, null, 2), (err) => {
    if (err) return console.log(err);
    res.status(204).json(updatedTour);
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1; // use this trick to convert string to int
  const filterItems = tours.filter((el) => el.id != id);  
  fs.writeFile(dirPath, JSON.stringify(filterItems, null, 2), (err) => {
    if (err) return console.log(err);
    res.status(204).json({});
  });
};