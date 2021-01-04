const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('CulturalEvent', {
    title: Joi.string(),
    description: Joi.string(),
    dateDebut : Joi.string(),
    dateFin : Joi.string(),
    heureDebut: Joi.number(),
    heureFin : Joi.number(),
    nbDayDuration : Joi.number(),
    fillingPercentageShowHall: Joi.number().required(),
    nbrPresonneAttendu: Joi.number(),
    lieu :Joi.string(),
    typeEvenement : Joi.string(),
    typePublic : Joi.string(),
    caId : Joi.number()
});
