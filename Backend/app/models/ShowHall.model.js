const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('ShowHall', {
    id: Joi.number(),
    name: Joi.string().required(),
    type: Joi.array().required(),
    capacity: Joi.number().required(),
    unavailableSlots: Joi.array()
});
