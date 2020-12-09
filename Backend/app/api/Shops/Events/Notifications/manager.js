const { Notification } = require('../../../../models')

/**
 * Function buildAPromo.
 * This function return a notification.
 * @param notifId
 */
const buildANotif = (notifId) => {
    const notif = Notification.getById(notifId);
    return notif
};

/**
 * Function  buildEvents.
 * This function build all promotions.
 */
const buildNotifs = () => {
    const notifs = Notification.get();
    return notifs.map((notif) => buildANotif(notif.id))
};

module.exports = {
    buildNotifs,
    buildANotif,
};
