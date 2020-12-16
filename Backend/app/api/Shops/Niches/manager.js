const {Niche,Shop } = require('../../../models')

/**
 * Function buildANiche.
 * This function return a Niche.
 * @param nicheId
 * @param shopId
 */
const buildANiche = (shopId,nicheId) => {
    const niche = Niche.getById(nicheId);
    const shop = Shop.getById(shopId)
    const shopIdInt = parseInt(shopId, 10)
    if (niche.shopId !== shopIdInt) throw new NotFoundError(`${niche.heureDebut}-${niche.heureFin} id=${nicheId} was not found for ${shop.label} id=${shop.id} : not found`)
    return niche
};

/**
 * Function  buildShopNiches.
 * This function build all Niches.
 */
const buildShopNiches = (shopId) => {
    const niches = Niche.get()
    const parsedId = parseInt(shopId, 10)
    return niches.filter((niche) => niche.shopId === parsedId)
}

module.exports = {
    buildShopNiches,
    buildANiche,
}
