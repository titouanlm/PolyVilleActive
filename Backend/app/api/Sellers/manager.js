const { Seller} = require('../../models');

/**
 * Function buildASeller.
 * This function return a seller which id is sent
 * @param sellerId
 */
const buildASeller = (sellerId) => {
    return Seller.getById(sellerId)
};

/**
 * Function  buildSellers.
 * This function return all sellers .
 */
const buildSellers = () => {
    return Seller.get();
};

module.exports = {
    buildSellers,
    buildASeller,
};
