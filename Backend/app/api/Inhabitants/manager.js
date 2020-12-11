const { Inhabitant } = require('../../models');

/**
 * Function buildAnInhabitant.
 * This function return a inhabitant which id is sent
 * @param inhabitantId
 */
const buildAnInhabitant = (inhabitantId) => {
    return Inhabitant.getById(inhabitantId)
};

/**
 * Function  buildInhabitants.
 * This function return all inhabitants .
 */
const buildInhabitants = () => {
    return Inhabitant.get()
};

module.exports = {
    buildInhabitants,
    buildAnInhabitant,
};
