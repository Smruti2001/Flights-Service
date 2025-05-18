const { StatusCodes } = require('http-status-codes');

const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/appError');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        /**
         * If we have added the validations in the DB for storing the data in a proper format
         * and the validation fails then the data entered by user is wrong 
         * thus we'll be capturing this and send this to the user so that they get to know the issue thus BAD REQUEST 
         * As this is the issue from the User's end we need to effectively communicate the error and if it would have been from our side then 
         * we could have send internal server error.
         */
        if(error.name == 'SequelizeValidationError') {
            const details = [];
            /**
             * error.errors is an array of objects and returns all the validation fails one by one in the array thus we are using the loop to get all the errors messages and push them onto the details array.
             */
            error.errors.forEach((err) => {
                details.push(err.message);
            });
            throw new AppError(details, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(['Something went wrong while creating an airplane'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError(['Unable to fetch all the Airplanes at the moment'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError([`Could not find the airplane with id: ${id}`], error.statusCode);
        }
        throw new AppError(['Unable to fetch the requested airplane at the moment'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id) {
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError([`Could not find the airplane with id: ${id}`], error.statusCode);
        }
        throw new AppError(['Unable to delete the requested airplane at the moment'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(id, data) {
    try {
        const airplane = await airplaneRepository.update(id, data);
        return airplane;
    } catch (error) {        
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            const details = [];
            error.errors.forEach((err) => {
                details.push(err.message);
            });
            throw new AppError(details, StatusCodes.BAD_REQUEST);
        }

        if(error.statusCode == StatusCodes.NOT_FOUND) {   
            throw new AppError([`Could not find the airplane with id: ${id}`], error.statusCode);
        }

        throw new AppError(['Something went wrong while creating an airplane'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}