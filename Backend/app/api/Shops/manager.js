const { Shop } = require('../../models');
const {Event } = require('../../models');

/**
 * Function buildAShop.
 * This function build a shop with his events
 * @param shopId
 */
const buildAShop = (shopId) => {
    const shop = Shop.getById(shopId);
    const events = Event.get();
    const parsedId = parseInt(shopId, 10);

    return { ...shop, "Events": events.filter((event) => event.shopId === parsedId) }
};

/**
 * Function  buildShops.
 * This function build all shops with there events.
 */
const buildShops = () => {
    const Shops = Shop.get();
    return Shops.map((shop) => buildAShop(shop.id))
};

module.exports = {
    buildShops,
    buildAShop,
};
