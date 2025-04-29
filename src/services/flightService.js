const { StatusCodes } = require('http-status-codes');

const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/AppError');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            const details = [];
            error.errors.forEach((err) => {
                details.push(err.message);
            });

            throw new AppError(details, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(['Something went wrong while creating flight'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight
}