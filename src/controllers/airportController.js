const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            cityId: req.body.cityId
        });
        SuccessResponse.message = 'Successfully created the airport';
        SuccessResponse.data = airport;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.message = 'Successfully fetched all airport data';
        SuccessResponse.data = airports;
        res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.message = 'Successfully fetched the requested airport data';
        SuccessResponse.data = airport;
        res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function destroyAirport(req, res) {
    try {
        const airport = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.message = 'Successfully deleted the requested airport data';
        SuccessResponse.data = airport;
        res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateAirport(req, res) {
    try {
        const airport = await AirportService.updateAirport(req.params.id, req.body);
        SuccessResponse.message = 'Successfully updated an airport';
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}