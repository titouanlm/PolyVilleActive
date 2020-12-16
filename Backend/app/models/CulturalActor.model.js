const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('CulturalActor', {
    nom : Joi.string(),
    prenom: Joi.string()
});
