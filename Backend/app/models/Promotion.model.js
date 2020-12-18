const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Promotion', {
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate : Joi.string().required(),
    endDate : Joi.string().required(),
    shopId : Joi.number().required(),
    eventId:Joi.number(),
    promoKeywords: Joi.string(),
    promoEventId: Joi.number(),
    promoType: Joi.number(),
    customersNumberInterested: Joi.array(),
    notifiedCustomersNumber: Joi.array(),
    condLeft: Joi.string(),
    condRight: Joi.string(),
    condSign: Joi.string(),
    public: Joi.boolean(),
});
