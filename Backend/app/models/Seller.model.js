const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Seller', {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    ShopId: Joi.number().required(),
})
