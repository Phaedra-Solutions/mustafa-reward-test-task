module.exports = (app) => {
  app.use('/v1/points', require('./points/routes-config'));
  app.use('', require('./default/routes-config'));
  // ADD ALL THE ROUTES CONFIGS HERE
}