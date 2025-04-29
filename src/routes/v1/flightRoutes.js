const express = require('express');
const { FlightMiddleware } = require('../../middlewares');
const { FlightController } = require('../../controllers');

const flightRouter = express.Router();

flightRouter.post('/', FlightMiddleware.validateCreateRequest, FlightController.createFlight);

module.exports = flightRouter;