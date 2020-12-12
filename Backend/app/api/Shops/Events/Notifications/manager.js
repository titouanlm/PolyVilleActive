const { Notification } = require('../../../../models')
const {buildAnEvent} = require('../../Events/manager')
/**
 * Function buildANotif.
 * This function return a notification.
 * @param notifId
 * @param shopId
 * @param eventId
 */
const buildANotif = (shopId,eventId,notifId) => {
    const notifs=buildEventNotifs(shopId,eventId)
    return notifs.filter((not) => not.id === notifId)
};

/**
 * Function  buildEvents.
 * This function build all promotions.
 */
const buildEventNotifs = (shopId, eventId) => {
    const event = buildAnEvent(shopId,eventId)
   // const notifs = Notification.get();
    return event.notifications;
};

module.exports = {
    buildNotifs: buildEventNotifs,
    buildANotif,
};
