const { Sequelize } = require('sequelize');

const CrudRepository = require("./crudRepository");
const { Flight, Airplane, Airport, City } = require('../models');
const db = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight)
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetails'
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col('Flight.departureAirportId'), '=', Sequelize.col('departureAirport.code'))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col('Flight.arrivalAirportId'), '=', Sequelize.col('arrivalAirport.code'))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        });
        return response;
    }

    async updateRemainingSeats(flightId, seats, dec = 1) {
        const transaction = await db.sequelize.transaction();
        try {
            // TODO - Add the row lock to avoid the race condition
            const flight = await Flight.findByPk(flightId);
            if (parseInt(dec)) { // Send dec value as 0 if you want increment as 0 is a falsy value
                await flight.decrement('totalSeats', { by: seats }, { transaction: transaction });
            } else {
                await flight.increment('totalSeats', { by: seats }, { transaction: transaction });
            }
            await transaction.commit();
            return flight;
        } catch (error) {
            await transaction.rollback();
            return error;
        }
    }
}

module.exports = FlightRepository;