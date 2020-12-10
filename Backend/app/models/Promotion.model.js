const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Promotion', {
    promoDescription: Joi.string().required(),
    promoStartDate : Joi.string(),
    promoEndDate : Joi.string(),
    promoShopId : Joi.number(),
    promoKeywords: Joi.string(),
    promoEventId: Joi.number(),
    promoType: Joi.number(),
    condLeft: Joi.string(),
    condRight: Joi.string(),
    condSign: Joi.string(),
});
