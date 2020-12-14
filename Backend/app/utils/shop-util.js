const {Shop, Promotion } = require('../models')

function associateAllPromos() {
    const shops = Shop.get();
    const promos = Promotion.get();
    const shopsWithPromos = shops.map((shop) => {
        return {...shop, promotions: promos.filter((promo) =>
                promo.shopId === shop.id
            )}
    });
    return shopsWithPromos;
}

function associatePromos(shopId) {
    const shop = Shop.getById(shopId)
    const promos = Promotion.get();
    return {...shop, promotions : promos.filter((promo) =>
            promo.shopId === shop.id
        )};
}


module.exports = {
    associateAllPromos,
    associatePromos,
}
