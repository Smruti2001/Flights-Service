const express = require('express');
const { ServerConfig, Logger } = require('./config');
const apiRouter = require('./routes');
const airport = require('./models/airport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server started at PORT: ${ServerConfig.PORT}`);
    Logger.info('This is a test info log to check the working of logging mechanism');

    // Testing ================

    const { City, Airport } = require('./models');
    // const city = await City.findByPk(2);
    // console.log(city);
    // Creating the Airport by the usual way
    // const airport = await Airport.crate({ name: 'Chhatrapati Shivaji Maharaj International Airport', code: 'BOM', cityId: 2 });

    // Creating the Airport by using the ORM capabilities =======================
    // const airport = await city.createAirport({ name: 'Chhatrapati Shivaji Maharaj International Airport', code: 'BOM' });
    // console.log(airport);

    // const airport = await Airport.findByPk(2);
    // console.log(airport);

    // await city.removeAirports(airport);

    await City.destroy({
        where: {
            id: 2
        }
    })

})