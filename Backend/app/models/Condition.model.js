const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Condition', {

    id: Joi.string().required(),
    type: Joi.string().required(),
    nb_clients: Joi.number(),
    promoId : Joi.number(),
    shopId: Joi.number(),

});
