const express = require('express');
const { FlightMiddleware } = require('../../middlewares');
const { FlightController } = require('../../controllers');

const flightRouter = express.Router();

flightRouter.post('/', FlightMiddleware.validateCreateRequest, FlightController.createFlight);
flightRouter.get('/', FlightController.getAllFlights);
flightRouter.get('/:id', FlightController.getFlight);

module.exports = flightRouter;