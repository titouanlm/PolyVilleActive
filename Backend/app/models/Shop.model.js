const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Shop', {
    shopId: Joi.number().required(),
    label: Joi.string().required(),
    longitude:  Joi.number().required(),
    latitude:  Joi.number().required(),
    sellerId: Joi.number(),
})
