const express = require('express');
const Image = require(__dirname + '/../models/image');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handle_db_error');

const imageRouter = module.exports = exports = express.Router();

imageRouter.get('/images', (req, res) => {
  Image.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

imageRouter.post('/images', jsonParser, (req, res) => {
  console.log('creating new image!');
  console.log(req);
  console.log(req.body);
  var newImage = new Image(req.body);
  newImage.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
