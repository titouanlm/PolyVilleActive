const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Seller', {

    firstName: Joi.string(),
    lastName: Joi.string(),
    ShopId: Joi.number(),
    id: Joi.number(),
});

