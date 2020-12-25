const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('ProhibitionRule', {
    employeeId: Joi.number().required(),
    type: Joi.string().required(),
    numberMaxPeopleExpected: Joi.number(),
    numberMinPeopleExpected: Joi.number(),
    targetPeople: Joi.string(),
});
