const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.post('', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
  let post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });

  Post.updateOne({
      _id: req.params.id
    }, post)
    .then((result) => {
      res.status(200).json({
        message: 'update sucessfull !'
      })
    })
    .catch((e) => {
      console.error(e);
    })
})

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: 'Post not found'
        });
      }
    })
})

router.get('', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
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

module.exports = router;
