const RestaurantsController = require('../controllers/restaurants_controller');

module.exports = (app) => {
  app.post('/api/restaurants', RestaurantsController.create);
  // app.put('/api/restaurants/:id', RestaurantsController.edit);
  app.get('/api/restaurants/:id', RestaurantsController.view);
  app.delete('/api/restaurants/:id', RestaurantsController.delete);
  app.get('/api/restaurants', RestaurantsController.index);
};
