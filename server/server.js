const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/app_dev');

const imageRouter = require(__dirname + '/routes/image_routes.js');

// X-Requested-With
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, body');
  // res.header('Access-Control-Allow-Methods', 'GET, POST');
  next();
});

app.use('/api', imageRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on Port: ' + PORT));
