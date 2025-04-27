const express = require('express');
const { PingCheckController } = require('../../controllers');
const airplaneRouter = require('./airplaneRoutes');
const cityRouter = require('./cityRoutes');

const v1Router = express.Router();

v1Router.use('/airplane', airplaneRouter);
v1Router.use('/city', cityRouter);
v1Router.get('/ping', PingCheckController.pingCheck);

module.exports = v1Router;