const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Seller', {

    firstName: Joi.string(),
    lastName: Joi.string(),
    shopId: Joi.number(),
    id: Joi.number(),
});

