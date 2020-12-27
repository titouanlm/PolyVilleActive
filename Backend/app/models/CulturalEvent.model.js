const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('CulturalEvent', {
    title: Joi.string(),
    description: Joi.string(),
    dateDebut : Joi.string(),
    dateFin : Joi.string(),
    heureDebut: Joi.string(),
    heureFin : Joi.string(),
    capacitesalle: Joi.number(),
    nbrPresonneAttendu: Joi.number(),
    lieu :Joi.string(),
    typeEvenement : Joi.string(),
    typePublic : Joi.string(),
    caId : Joi.number()
});
