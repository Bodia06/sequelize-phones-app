const createError = require('http-errors');
const _ = require('lodash');
const { Phone } = require('../models');

module.exports.createPhone = async (req, res, next) => {
  const { body } = req;
  try {
    const newPhone = await Phone.create(body);

    if (!newPhone) {
      return next(createError(400, 'Failed to create phone'));
    }

    const phoneData = _.omit(newPhone.get(), ['createdAt', 'updatedAt']);

    res.status(201).send({ data: phoneData });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhones = async (req, res, next) => {
  const { limit, offset } = req.pagination || {};

  try {
    const foundPhones = await Phone.findAll({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit,
      offset,
      order: [['id', 'ASC']],
    });

    if (!foundPhones) {
      return next(createError(404, 'No phones found'));
    }

    res.status(200).send({ data: foundPhones });
  } catch (err) {
    next(err);
  }
};
