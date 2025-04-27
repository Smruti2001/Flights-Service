const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/AppError");

function validateCreateRequest(req, res, next) {
    if (!req.body.modelNumber) {
        ErrorResponse.message = 'Something went wrong while creating airplanes';
        ErrorResponse.error = new AppError(['Model Number not found in the incoming request in the required form'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next) {
    if(!req.body.modelNumber && !req.body.capacity) {
        ErrorResponse.message = 'Something went wrong while updating airplane';
        ErrorResponse.error = new AppError(['Model Number or capacity not found in the incoming request in the required form'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}