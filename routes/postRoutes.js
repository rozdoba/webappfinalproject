const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const is_authenticated = require('../utils/is-auth');

router.get('/posts/searchTopic', is_authenticated, postController.getPostsByTopic);

router.get('/posts/search', is_authenticated, postController.getPostsBySubject);

router.post('/reply', is_authenticated, postController.replyToPost);

router.post('/post', is_authenticated, postController.createPost);

router.get('/posts/home', is_authenticated, postController.getPostsByDate);

router.get('/posts/all/initial', postController.getAllPostsInitial);

router.get('/posts/all', postController.getAllPosts);
router.get('/posts/:page', postController.getAllPosts);

module.exports = router;

module.exports = router;