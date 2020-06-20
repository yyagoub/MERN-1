const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// get posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a post
router.get('/:postId', async (req, res) => {
  const posts = await Post.findById(req.params.postId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// delete a post
router.delete('/:postId', async (req, res) => {
  const posts = await Post.remove({ _id: req.params.postId })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// post a post
router.post('/', async (req, res) => {
  // creating the object
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  // save and retreive the object to the database
  const savedPost = await post
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  // log the object
  console.log(savedPost);
});

module.exports = router;
