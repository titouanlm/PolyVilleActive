const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Inhabitant', {
    firstName: Joi.string(),
    lastName: Joi.string(),
    longitude:  Joi.number(),
    latitude:  Joi.number(),
    id: Joi.number(),
    age: Joi.number(),
    sex: Joi.string(),
    shopRated: Joi.array().items(Joi.number()),
    positions: Joi.array().items(Joi.array().min(2).max(2)),
    objectPurchased: Joi.array().items(Joi.array()),
    gender: Joi.string(),
    currentReservation : Joi.object({
        platNumber: Joi.string().allow(""),
        heureDebut: Joi.string().allow(""),
        heureFin: Joi.string().allow(""),
        shopId: Joi.number().allow(0),
        place : Joi.string().allow(""),
        shopName: Joi.string().allow("")
    })

});
