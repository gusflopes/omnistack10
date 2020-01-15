const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
  async index(request, response) {
    const {latitude, longitude, techs} = request.query;
    console.log(request.query);

    const techsArray = await parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
            // coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 10000,
        },
      },
    });

    console.log(request.query);
    // Buscar todos os devs num raio de 10km
    // Filtrar por tecnologia
    return response.json({ devs });
  }
}