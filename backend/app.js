const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var posts = [{
    id: 'dfa23',
    title: 'First post',
    content: 'This is the first content'
  },
  {
    id: 'fgsfg434',
    title: 'Second post',
    content: 'This is the second content'
  }
]

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,Content-type,Accept,X-Request-With');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  next();
})

app.post('/api/posts', (req, res, next) => {
  let newPosts = req.body;
  posts.push(newPosts);
  console.log(posts);
  res.status(201).json({
    message: 'successfully added post'
  });
});

app.use('/api/posts', (req, res, next) => {

  res.status(200).json({
    message: 'Post fetched successfully!',
    posts
  });
});

module.exports = app;
