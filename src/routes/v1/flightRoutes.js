const express = require('express');
const { FlightMiddleware } = require('../../middlewares');
const { FlightController } = require('../../controllers');

const flightRouter = express.Router();

flightRouter.post('/', FlightMiddleware.validateCreateRequest, FlightController.createFlight);
flightRouter.get('/', FlightController.getAllFlights);
flightRouter.get('/:id', FlightController.getFlight);
flightRouter.patch('/:id/seats', FlightMiddleware.validateUpdateSeatRequest, FlightController.updateRemainingSeats);

module.exports = flightRouter;