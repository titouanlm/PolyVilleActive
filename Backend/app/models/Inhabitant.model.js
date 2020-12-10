const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Seller', {
    number: Joi.number().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    longitude:  Joi.number(),
    latitude:  Joi.number(),
});
