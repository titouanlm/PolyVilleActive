const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('TownHallEmployee', {
    Nom : Joi.string(),
    Prenom: Joi.string()
});
