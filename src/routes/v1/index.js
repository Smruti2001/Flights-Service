const express = require('express');
const { PingCheckController } = require('../../controllers');
const airplaneRouter = require('./airplaneRoutes');

const v1Router = express.Router();

v1Router.use('/airplane', airplaneRouter);
v1Router.get('/ping', PingCheckController.pingCheck);

module.exports = v1Router;