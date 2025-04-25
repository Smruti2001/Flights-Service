const express = require('express');
const { AirplaneController } = require('../../controllers')

const airplaneRouter = express.Router();

airplaneRouter.post('/', AirplaneController.createAirplane);

module.exports = airplaneRouter;