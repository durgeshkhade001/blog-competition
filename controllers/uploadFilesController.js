const UploadedFile = require('../models/uploadedFile');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed.'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter
}).single('image'); 

function getUploadedFile(req, res) {
  const fileId = req.params.id;

  UploadedFile.findById(fileId)
    .then((file) => {
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
      res.status(200).json(file);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}

function uploadFile(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Multer error: ' + err.message });
    } else if (err) {
      return res.status(400).json({ message: 'An unknown error occurred' });
    }

    const file = new UploadedFile({
      filename: req.file.filename,
      path: req.file.path.replace(/\\/g, '/').replace(/public/, ''),
    });

    file.save()
      .then((result) => {
        res.status(201).json({
          message: 'File uploaded successfully',
          createdFile: result,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });
}

module.exports = {
  getUploadedFile,
  uploadFile,
};
