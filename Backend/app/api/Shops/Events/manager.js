const {Event } = require('../../../models');
const {Promotion } = require('../../../models');
const {Notification} = require('../../../models');

/**
 * Function buildAnEvent.
 * This function build a shop with his events and notifications.
 * @param eventId
 */
const buildAnEvent = (eventId) => {
    const event = Event.getById(eventId);
    const promotions = Promotion.get();
    const notifications = Notification.get();
    const parsedId = parseInt(eventId, 10);

    return { event, ...notifications.filter((notif) => notif.notifEventId === parsedId) , ...promotions.filter((promo) => promo.notifEventId === parsedId) }
};

/**
 * Function  buildEvents.
 * This function build all events with there promotions and notifications.
 */
const buildEvents = () => {
    const events = Event.get();
    return events.map((event) => buildAnEvent(event.id))
};

module.exports = {
    buildEvents,
    buildAnEvent,
};
