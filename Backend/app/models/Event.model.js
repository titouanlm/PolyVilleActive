const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Event', {
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate : Joi.string().required(),
    endDate : Joi.string().required(),
    keywords: Joi.string(),
    shopId : Joi.number().required()

})
