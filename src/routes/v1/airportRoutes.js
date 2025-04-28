const express = require('express');
const { AirportMiddleware } = require('../../middlewares');
const { AirportController } = require('../../controllers');

const airportRouter = express.Router();

airportRouter.post('/', AirportMiddleware.validateCreateRequest, AirportController.createAirport);
airportRouter.get('/', AirportController.getAirports);
airportRouter.get('/:id', AirportController.getAirport);
airportRouter.delete('/:id', AirportController.destroyAirport);
airportRouter.patch('/:id', AirportMiddleware.validateUpdateRequest, AirportController.updateAirport);

module.exports = airportRouter;