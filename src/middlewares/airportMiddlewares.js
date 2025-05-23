const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/AppError");

function validateCreateRequest(req, res, next) {
    if (!req.body.name) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['Airport name not found in the incoming request in the required form'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (!req.body.code) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['Airport code not found in the incoming request in the required form'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (!req.body.cityId) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['Airport cityId not found in the incoming request in the required form'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

function validateUpdateRequest(req, res, next) {
    if(!req.body.name && !req.body.code && !req.body.cityId) {
        ErrorResponse.message = 'Something went wrong while updating airport';
        ErrorResponse.error = new AppError(['Missing or improperly formatted in the incoming request.'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}