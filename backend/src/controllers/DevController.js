const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },


  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    console.log('passou por aqui')

    
    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      const { name = login, avatar_url, bio } = apiResponse.data;
    
      const techsArray = await parseStringAsArray(techs);
    
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
  
    return response.json(dev);
  },

  async update(request, response) {
    const github_username  = request.params.dev;
    const { techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      return response.status(401).json({error: 'Dev não cadastrado.'});
    }
    const { id } = dev;

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    const { name = login, avatar_url, bio } = apiResponse.data;
  
    const techsArray = await parseStringAsArray(techs);
  
    const location = {
      type: 'Point',
      coordinates: [ longitude, latitude ],
    };
    console.log(id);

    dev = await Dev.findByIdAndUpdate(id, {
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    }, { new: true } );

    // dev = await Dev.findById(id);
  
    console.log(name, avatar_url, bio, github_username);
  
    return response.json(dev);
    // name, avatar, bio, location, techs
  },

  async destroy(request, response) {
    const { dev } = request.params;

    const deleteDev = await Dev.findOneAndDelete({github_username: dev})
    
    if (!deleteDev) {
      return response.status(401).json({ error: 'Dev não localizado.' });
    }
  
    return response.status(200).json({message: 'Deletado.'})
  },

};
