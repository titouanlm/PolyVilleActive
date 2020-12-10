const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Shop', {
    shopId: Joi.number(),
    label: Joi.string(),
    longitude:  Joi.number(),
    latitude:  Joi.number(),
    sellerId: Joi.number().required(),
})
