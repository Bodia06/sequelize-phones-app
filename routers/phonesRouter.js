const { Router } = require('express');
const { phonesController } = require('../controllers');
const { paginate } = require('../middleware');

const phonesRouter = Router();

phonesRouter
  .route('/')
  .get(phonesController.getPhones)
  .post(paginate.paginatePhones, phonesController.createPhone);

phonesRouter
  .route('/:id')
  .patch(() => {})
  .delete(() => {});

module.exports = phonesRouter;
