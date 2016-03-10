module.exports = function(app) {
  require('./form_controller')(app);
  require('./image_controller')(app);
};
