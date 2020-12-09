const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Promotion', {
    promoId: Joi.number().required(),
    promoDescription: Joi.string().required(),
    promoStartDate : Joi.string(),
    promoEndDate : Joi.string(),
    promoShopId : Joi.number(),
    promoKeywords: Joi.array(),
    promoEventId: Joi.number(),
    promoType: Joi.number(),
    condLeft: Joi.string(),
    condRight: Joi.string(),
    condSign: Joi.string(),
});
