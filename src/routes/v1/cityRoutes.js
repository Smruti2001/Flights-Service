const express = require('express');

const { CityController } = require('../../controllers');
const { CityMiddleware } = require('../../middlewares');

const cityRouter = express.Router();

cityRouter.post('/', CityMiddleware.validateCreateRequest, CityController.createCity);

module.exports = cityRouter;