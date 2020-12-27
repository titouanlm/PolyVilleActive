const {CulturalEvent,CulturalActor } = require('../../../models')

/**
 * Function buildACulturalEvent.
 * This function return a Cultural Event.
 * @param ceId
 * @param caId
 */
const buildACulturalEvent = (caId,ceId) => {
    const cevent = CulturalEvent.getById(ceId);
    const cactor = CulturalActor.getById(caId)
    const caIdInt = parseInt(caId, 10)
    if (cevent.caId!== caIdInt) throw new NotFoundError(`${cevent.title} id=${ceId} was not found for ${cactor.name}`)
    return cevent
};

/**
 * Function  buildActorCulturalEvents.
 * This function build all Cultural Events.
 */
const buildActorCulturalEvents = (caId) => {
    const cevents = CulturalEvent.get()
    const parsedId = parseInt(caId, 10)
    return cevents.filter((cevent) =>cevent.caId === parsedId)
}

module.exports = {
    buildActorCulturalEvents,
    buildACulturalEvent,
}
