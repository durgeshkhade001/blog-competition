const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getAllBlogs);
router.get('/published', blogController.getAllPublishedBlogs);
router.get('/public', blogController.getAllPublicBlogs);
router.get('/accept/:id', blogController.acceptBlog);
router.get('/reject/:id', blogController.rejectBlog);
router.post('/', blogController.createBlog);
router.get('/author/:author', blogController.getAllBlogsOfUser);
router.get('/publish/:id', blogController.publishBlog);
router.get('/:id', blogController.getBlogById);

module.exports = router;
