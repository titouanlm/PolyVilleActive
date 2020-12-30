const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('ProhibitionRule', {
    type: Joi.string().required(),
    createdBy: Joi.string().required(),
    numberMaxPeopleExpected: Joi.number(),
    numberMinPeopleExpected: Joi.number(),
    targetPeople: Joi.array(),
    code: Joi.string().required(),
    text: Joi.string().required()
});
