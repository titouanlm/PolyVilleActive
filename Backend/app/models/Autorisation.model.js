const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Autorisation', {

    id: Joi.number().required(),
    shopId: Joi.number().required(),
    inhabitantId: Joi.number().required(),
});
