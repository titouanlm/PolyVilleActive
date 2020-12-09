const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Seller', {
    sellerId: Joi.number().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    longitude:  Joi.number().required(),
    latitude:  Joi.number().required(),
});
