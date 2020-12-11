const {Promotion } = require('../../models');

/**
 * Function buildAPromo.
 * This function return a promotion.
 * @param promoId
 */
const buildAPromo = (promoId) => {
    return Promotion.getById(promoId)
};

/**
 * Function  buildEvents.
 * This function build all promotions.
 */
const buildPromos = () => {
    const promos = Promotion.get();
    return promos.map((promo) => buildAPromo(promo.id))
};

module.exports = {
    buildPromos,
    buildAPromo,
};
