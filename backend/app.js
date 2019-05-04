const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');

// conecting to database
mongoose.connect('mongodb+srv://vipin:vipin1@cluster0-6bol8.mongodb.net/node-angular?retryWrites=true', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Conected to database.");
  })
  .catch((e) => {
    console.error('Error while connecting to database.', e);
  });

// header to avoid cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,Content-type,Accept,X-Request-With');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  next();
})

app.use(bodyParser.json());
app.use('/api/posts', postRoutes);

module.exports = app;
