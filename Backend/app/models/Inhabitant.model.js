const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Inhabitant', {
    firstName: Joi.string(),
    lastName: Joi.string(),
    longitude:  Joi.number(),
    latitude:  Joi.number(),
    id: Joi.number(),
    shopRated: Joi.array().items(Joi.number()),
    positions: Joi.array().items(Joi.array().min(2).max(2)),
});
