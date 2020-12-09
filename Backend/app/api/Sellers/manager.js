const { Seller} = require('../../models')

/**
 * Function buildASeller.
 * This function return a seller which id is sent
 * @param sellerId
 */
const buildASeller = (sellerId) => {
    const seller = Seller.getById(sellerId);
    return seller
};

/**
 * Function  buildSellers.
 * This function return all sellers .
 */
const buildSellers = () => {
    const sellers = Seller.get()
    return sellers.map((seller) => buildASeller(seller.id))
}

module.exports = {
    buildSellers,
    buildASeller,
}
