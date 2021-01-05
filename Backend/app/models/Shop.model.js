const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Shop', {
    label: Joi.string().required(),
    longitude:  Joi.number().required(),
    latitude:  Joi.number().required(),
    sellerId: Joi.number().required(),
    id: Joi.number(),
    numberOfPurchaseByAgeRang: Joi.array(),  //0-14,15-29,30-44,45-59,60-74,75-+
    numberOfPurchaseBySexRang: Joi.array(),
    storeRating: Joi.object({
        averageRate: Joi.number().min(0).max(10),
        voterNumber: Joi.number(),
    }),
    promotions: Joi.array(),
    averagePresenceBeforePurchase: Joi.object({
        numberOfPurchases: Joi.number(),
        numberOfPresence: Joi.number(),
    }),
    purchasedItems: Joi.array().items(Joi.array()),

    parkingSpace: Joi.object({
        nbrPlace: Joi.number(),
        nbrPlaceFree: Joi.number(),
        nbrPlaceUnassignable :Joi.number(),
        nbrPlaceUnassignableFree :Joi.number(),
        places : Joi.array().items(Joi.object({

            name : Joi.string(),
            availability : Joi.boolean()
        })),
        placesUnassignable: Joi.array().items(Joi.object({

            name : Joi.string(),
            availability : Joi.boolean()
        }))
    })
});
