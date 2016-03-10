const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  imageUrl: String,
  imageTitle: String
});

module.exports = exports = mongoose.model('Image', imageSchema);
