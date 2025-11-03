const multer = require('multer');
const path = require('path');
const { STATIC_PATH } = require('../constants');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(STATIC_PATH, 'images'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

function fileFilter (req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg and .png files are allowed'), false);
  }
}

const upload = multer({ storage, fileFilter });

module.exports.uploadPhoneImages = upload.single('phoneImage');
