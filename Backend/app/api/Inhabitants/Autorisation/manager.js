const { Autorisation } = require('../../../models');
const {buildAnInhabitant} = require('../../Inhabitants/manager');


/**
 * Function buildAnAutorisation.
 * This function build an Autorisation
 * @param autorisationId
 */
const buildAnAutorisation = (autorisationId) => {
    const autorisation= Autorisation.getById(autorisationId);
    return autorisation;
};


/**
 * Function  buildAutorisations.
 * This function build all autorisations.
 */
const buildAutorisations = () => {
    return Autorisation.get();
};

module.exports = {
    buildAnAutorisation,
    buildAutorisations,
};

