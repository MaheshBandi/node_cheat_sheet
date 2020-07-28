const express =  require('express');
const {getAllTours,createTour,getTour,updateTour,deleteTour,checkId} = require('../controllers/tourController');

const router = express.Router();

//use param middleware when we want to use soming when the request come for a specific parameneter option
router.param('id',checkId);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
module.exports = router;