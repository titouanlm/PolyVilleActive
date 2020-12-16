const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('ValidationRule', {
    code : Joi.string(),
    thEmployeeId: Joi.string()
});
