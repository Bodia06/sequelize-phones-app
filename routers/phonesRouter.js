const { Router } = require('express');

const phonesRouter = Router();

phonesRouter
  .route('/')
  .get(() => {})
  .post(() => {});

phonesRouter
  .route('/:id')
  .patch(() => {})
  .delete(() => {});

module.exports = phonesRouter;
