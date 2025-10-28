const createError = require('http-errors');
const { Op } = require('sequelize');
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

module.exports.getAllPhonesByYear = async (req, res, next) => {
  const { year } = req.params;

  try {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const foundPhones = await Phone.findAll({
      raw: true,
      where: {
        year: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!foundPhones || foundPhones.length === 0) {
      return next(createError(404, `No phones found for year ${year}`));
    }

    res.status(200).send({ data: foundPhones });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllPhonesMoreThanYear = async (req, res, next) => {
  const { moreYear } = req.params;

  try {
    const startDate = new Date(`${moreYear}-01-01`);
    const foundPhones = await Phone.findAll({
      raw: true,
      where: {
        year: {
          [Op.gt]: startDate,
        },
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!foundPhones || foundPhones.length === 0) {
      return next(
        createError(404, `No phones found for year greater than ${year}`)
      );
    }

    res.status(200).send({ data: foundPhones });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePhone = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const [updatedPhoneCount, updatedPhone] = await Phone.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (updatedPhoneCount === 0) {
      return next(createError(404, `Phone with id ${id} not found`));
    }

    const phoneData = _.omit(updatedPhone, ['createdAt', 'updatedAt']);

    res.status(200).send({ data: phoneData });
  } catch (err) {
    next(err);
  }
};

module.exports.updateAllPhonesQuelityYear = async (req, res, next) => {
  const { year } = req.params;
  const { body } = req;

  try {
    const [updatedPhoneCount, updatedPhones] = await Phone.update(body, {
      where: { year },
      raw: true,
      returning: true,
    });

    if (updatedPhoneCount === 0) {
      return next(createError(404, `No phones found for year ${year}`));
    }

    const phonesData = updatedPhones.map(phone =>
      _.omit(phone, ['createdAt', 'updatedAt'])
    );

    res.status(200).send({ data: phonesData });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePhone = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPhoneCount = await Phone.destroy({
      where: { id },
      returning: true,
    });

    if (deletedPhoneCount === 0) {
      return next(createError(404, `Phone with id ${id} not found`));
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports.deleteAllPhonesByYear = async (req, res, next) => {
  const { year } = req.params;

  try {
    const deletedPhoneCount = await Phone.destroy({
      where: { year },
      returning: true,
    });

    if (deletedPhoneCount === 0) {
      return next(createError(404, `No phones found for year ${year}`));
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports.avgRamAllPhones = async (req, res, next) => {
  try {
    const result = await Phone.findAll({
      raw: true,
      attributes: [
        [Phone.sequelize.fn('AVG', Phone.sequelize.col('ram')), 'avgRam'],
      ],
    });

    const avgRam = parseFloat(result[0].avgRam);

    res.status(200).send({ data: { avgRam } });
  } catch (err) {
    next(err);
  }
};

module.exports.countPhonesByBrands = async (req, res, next) => {
  try {
    const result = await Phone.findAll({
      raw: true,
      attributes: [
        'brand',
        [Phone.sequelize.fn('COUNT', Phone.sequelize.col('id')), 'count'],
      ],
      group: ['brand'],
    });

    const countsByBrand = result.map(item => ({
      brand: item.brand,
      count: parseInt(item.count, 10),
    }));

    res.status(200).send({ data: countsByBrand });
  } catch (err) {
    next(err);
  }
};

module.exports.brandByMaxScreenSize = async (req, res, next) => {
  const { screenSize } = req.params;

  try {
    const phones = await Phone.findAll({
      raw: true,
      where: {
        screenSize: {
          [Phone.sequelize.Op.gt]: screenSize,
        },
      },
      attributes: ['brand'],
      group: ['brand'],
    });

    if (!phones || phones.length === 0) {
      return next(
        createError(404, `No brands found with screen size => ${screenSize}`)
      );
    }

    const brands = phones.map(phone => phone.brand);

    res.status(200).send({ data: brands });
  } catch (err) {
    next(err);
  }
};
