const path = require('path');

const CONSTANTS = {
  STATUS_PREORDERS: ['pending', 'confirmed', 'done'],
  STATIC_PATH: path.join(__dirname, process.env.STATIC_FOLDER),
};

module.exports = CONSTANTS;
