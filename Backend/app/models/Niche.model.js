const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Niche', {
   heureDebut: Joi.number(),
   heureFin: Joi.number(),
   freqMoyenne: Joi.number(),
   shopId: Joi.number(),
});
