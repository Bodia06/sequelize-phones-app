const { Router } = require('express');
const { phonesController } = require('../controllers');
const { paginate } = require('../middleware');

const phonesRouter = Router();

phonesRouter
  .route('/')
  .get(paginate.paginatePhones, phonesController.getPhones)
  .post(phonesController.createPhone);

phonesRouter
  .route('/:id')
  .patch(phonesController.updatePhone)
  .delete(phonesController.deletePhone);

phonesRouter
  .route('/year/:year')
  .get(phonesController.getAllPhonesByYear)
  .patch(phonesController.updateAllPhonesQuelityYear)
  .delete(phonesController.deleteAllPhonesByYear);

phonesRouter.get(
  '/more-year/:moreYear',
  phonesController.getAllPhonesMoreThanYear
);

phonesRouter.get('/avg-ram', phonesController.avgRamAllPhones);

phonesRouter.get('/count-by-brand', phonesController.countPhonesByBrands);

phonesRouter.get(
  '/brand-by-screen/:screenSize',
  phonesController.brandByMaxScreenSize
);

phonesRouter.get(
  '/:id/preorders',
  phonesController.getPreordersPhonesByPnonesId
);

phonesRouter.get(
  '/preorders/:id',
  phonesController.getPreordersPhonesAllInformation
);
module.exports = phonesRouter;
