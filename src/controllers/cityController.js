const { StatusCodes } = require("http-status-codes");

const { CityService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createCity(req, res) {
    try {
        const city = await CityService.createCity(req.body);
        SuccessResponse.message = ['Successfully created the city'];
        SuccessResponse.data = city;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createCity
}