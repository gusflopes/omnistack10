const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    const devs = Dev.find();

    return response.json(devs);
  },


  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
  
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github/com/users/${github_username}`);
      const { name = login, avatar_url, bio } = apiResponse.data;
    
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [ longitude, latitude ],
      };
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    
      console.log(name, avatar_url, bio, github_username);
    }
  
    return response.json(apiResponse.data);
  },

  async update() {
    // name, avatar, bio, location, techs
  },

  async destroy() {
    // deletar um dev
  },

};
