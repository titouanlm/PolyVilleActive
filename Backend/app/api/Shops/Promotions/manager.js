const {Promotion } = require('../../../models')
const {buildAnEvent} = require('../Events/manager')

/**
 * Function buildAPromo.
 * This function return a promotion.
 * @param promoId
 * @param shopId
 * @param eventId
 */
const buildAPromo = (shopId,eventId,promoId) => {
    const promos=buildEventPromos(shopId,eventId)
    return promos.filter((prom) => prom.id === promoId)
    //const promo = Promotion.getById(promoId);
    //return promo
};

/**
 * Function  buildEvents.
 * This function build all promotions.
 */
const buildEventPromos = (shopId,eventId) => {
    const event = buildAnEvent(shopId,eventId)
    return event.promotions;
    //const promos = Promotion.get()
   // return promos.map((promo) => buildAPromo(promo.id))
}

module.exports = {
    buildPromos: buildEventPromos,
    buildAPromo,
}
