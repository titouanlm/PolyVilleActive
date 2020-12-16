const { Autorisation } = require('../../../models');
const {buildAnInhabitant} = require('../../Inhabitants/manager');
const {Inhabitant } = require('../../../models');
const {Shop }= require('../../../models');


/**
 * Function buildAnAutorisation.
 * This function build an Autorisation
 * @param autorisationId
 */
const buildAnAutorisation = (autorisationId,inhabitantId) => {
    const autorisation= Autorisation.getById(autorisationId);
    const inhabitant = Inhabitant.getById(inhabitantId);
    const inhabitantIdInt=parseInt(inhabitantId);

    if(autorisation.inhabitantId!==inhabitantIdInt) throw new NotFoundError('autorisation not found for inhabitantId=${inhabitantId}');

    return autorisation;
};


/**
 * Function  buildAutorisations.
 * This function build all autorisations.
 */
const buildAutorisations = (inhabitantId) => {
    const autorisations=Autorisation.get();
    const inhabitantIdInt=parseInt(inhabitantId,10);
    return autorisations.filter((autorisation) => autorisation.inhabitantId === inhabitantIdInt)

};

module.exports = {
    buildAnAutorisation,
    buildAutorisations,
};

