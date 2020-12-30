const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('ProhibitionRule', {
    type: Joi.string().required(),
    createdBy: Joi.string().required(),
    numberMaxPeopleExpected: Joi.number(),
    numberMinPeopleExpected: Joi.number(),
    numberMinEventDuration: Joi.number(),
    numberMaxEventDuration: Joi.number(),
    operandShowHallCondition: Joi.string(),
    percentageShowHallCondition: Joi.number(),
    targetPeople: Joi.array(),
    nbAnd: Joi.number().required(),
    nbOr: Joi.number().required(),
    code: Joi.string().required(),
    text: Joi.string().required()
});
