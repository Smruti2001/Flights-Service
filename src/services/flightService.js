const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');

const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/AppError');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            const details = [];
            error.errors.forEach((err) => {
                details.push(err.message);
            });

            throw new AppError(details, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(['Something went wrong while creating flight'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let filterObject = {};
    let sortFilter = [];

    const endingTripTime = ' 23:59:00';
    // Ex - DEL-BOM
    if (query.trip) {
        const [departureAirportId, arrivalAirportId] = query.trip.split('-');
        filterObject.departureAirportId = departureAirportId;
        filterObject.arrivalAirportId = arrivalAirportId;
    }

    if (query.price) {
        const [minPrice, maxPrice] = query.price.split('-');
        filterObject.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000 : maxPrice)]
        }
    }

    if (query.travellers) {
        filterObject.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    if (query.tripDate) {
        filterObject.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }

    if(query.sort) {
        const params = query.sort.split(',');
        sortFilter = params.map(param => param.split('_'));
    }

    console.log(filterObject, sortFilter);

    try {
        const flights = await flightRepository.getAllFlights(filterObject, sortFilter);
        return flights;
    } catch (error) {
        throw new AppError(['Unable to fetch all the Flights at the moment'], StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError([`Could not find the flight with id: ${id}`], error.statusCode);
        }
        throw new AppError(['Unable to fetch the requested flight at the moment'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateRemainingSeats(data) {
    try {
        const flight = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return flight;
    } catch (error) {
        throw new AppError(['Unable to fetch all the Flights at the moment'], StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateRemainingSeats
}