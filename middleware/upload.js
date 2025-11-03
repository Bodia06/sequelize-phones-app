const multer = require('multer');
const path = require('path');
const { STATIC_PATH } = require('../constants');

const upload = multer({ dest: path.join(STATIC_PATH, 'images') });

module.exports.uploadPhoneImages = upload.single('phoneImage');
