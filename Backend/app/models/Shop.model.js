const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Shop', {
    label: Joi.string().required(),
    longitude:  Joi.number().required(),
    latitude:  Joi.number().required(),
    sellerId: Joi.number().required(),
    id: Joi.number(),
    storeRating: Joi.object({
        averageRate: Joi.number().min(0).max(10),
        voterNumber: Joi.number(),
    }),
    promotions: Joi.array(),
});
