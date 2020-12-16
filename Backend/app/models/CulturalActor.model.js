const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('CulturalActor', {
    Nom : Joi.toString(),
    Prenom: Joi.toString()
});
