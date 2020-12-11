const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Shop', {

    label: Joi.string().required(),
    longitude:  Joi.number().required(),
    latitude:  Joi.number().required(),
    sellerId: Joi.number().required(),
    storeNote: Joi.number(),
    id: Joi.number(),
});
