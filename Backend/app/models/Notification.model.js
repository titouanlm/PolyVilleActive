const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Notification', {
    notifId: Joi.number().required(),
    notifDescription: Joi.string().required(),
    notifType: Joi.number(),
    notifEventId: Joi.number(),
    condLeft: Joi.string(),
    condRight: Joi.string(),
    condSign: Joi.string(),
});
