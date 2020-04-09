const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
    const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const { name = login, avatar_url, bio, blog } = apiRes.data;
      const techsArray = techs.split(',').map(tech => tech.trim());
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        blog,
        techs: techsArray,
        location
      });
    } else {
      return res.json({ error: "Developer already registered" });
    }

    return res.json(dev);
  }
}