const express = require('express');

const { AirplaneController } = require('../../controllers');
const { AirplaneMiddleware } = require('../../middlewares');

const airplaneRouter = express.Router();

airplaneRouter.post('/', AirplaneMiddleware.validateCreateRequest, AirplaneController.createAirplane);

module.exports = airplaneRouter;