const express = require('express');
const router = express.Router();
const uploadFilesController = require('../controllers/uploadFilesController.js');

router.get('/:id', uploadFilesController.getUploadedFile);
router.post('/', uploadFilesController.uploadFile);

module.exports = router;
