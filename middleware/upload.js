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
  const MIMETYPE_REG_EXP = /^image\/(png|jpg|jpeg|gif)$/;
  cb(null, MIMETYPE_REG_EXP.test(file.mimetype));
}

const upload = multer({ storage, fileFilter });

module.exports.uploadPhoneImages = upload.single('phoneImage');
