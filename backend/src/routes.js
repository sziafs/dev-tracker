const { Router } = require('express');
const DevController = require('./controllers/DevController');

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ 'status': 'API working' });
});

routes.post('/devs', DevController.store);

module.exports = routes;