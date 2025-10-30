const express = require('express');
const router = require('./routers');
const { errorHandlers } = require('./middleware');
const { STATIC_PATH } = require('./constants');

const app = express();

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(`${STATIC_PATH}`));

app.use('/api', router);

app.use(errorHandlers.dbErrorHandler, errorHandlers.errorHandler);

module.exports = app;
