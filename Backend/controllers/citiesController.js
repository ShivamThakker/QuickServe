const { cities } = require('../data/cities');

exports.getCities = (req, res) => {
  res.json(cities);
};
