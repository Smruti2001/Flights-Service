const { AirplaneRepository } = require('../repositories');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.crate(data);
        return airplane;
    } catch (error) {
            throw error;
    }
}

module.exports = {
    createAirplane
}