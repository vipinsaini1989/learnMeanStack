const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const Post = require('./models/post');

mongoose.connect('mongodb+srv://vipin:vipin1@cluster0-6bol8.mongodb.net/node-angular?retryWrites=true', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Conected to database.");
  })
  .catch((e) => {
    console.error('Error while connecting to database.', e);
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,Content-type,Accept,X-Request-With');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  next();
})

app.post('/api/posts', (req, res, next) => {
  let post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save()
    .then((createdPost) => {
      res.status(201).json({
        message: 'successfully added post',
        postId: createdPost['_id']
      });
    })
    .catch(e => console.error(e));
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Post fetched successfully!',
        posts: documents
      });
    })
    .catch((err) => {
      console.error(err);
    })
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({
      _id: req.params.id
    })
    .then((deleted) => {
      // console.log(deleted);
      res.status(200).json({
        message: `deleted ${req.params.id} id.`
      });
    });
})

module.exports = app;
