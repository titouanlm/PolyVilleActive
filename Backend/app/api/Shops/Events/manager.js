const {Event } = require('../../../models');
const {Promotion } = require('../../../models');
const {Notification} = require('../../../models');

/**
 * Function buildAnEvent.
 * This function build a shop with his events and notifications.
 * @param eventId
 * @param shopId
 */
const buildAnEvent = (shopId,eventId) => {
    const event = Event.getById(eventId);
    const shop = Shop.getById(shopId)
    const shopIdInt = parseInt(shopId, 10)
    if (event.shopId !== shopIdInt) throw new NotFoundError(`${event.title} id=${eventId} was not found for ${shop.label} id=${shop.id} : not found`)
    const promotions = Promotion.get();
    const notifications = Notification.get();
    const parsedId = parseInt(eventId, 10);

    return { ...event, "notifications": notifications.filter((notif) => notif.notifEventId === parsedId) , "promotions": promotions.filter((promo) => promo.notifEventId === parsedId) }
};

/**
 * Function  buildEvents.
 * This function build all events with there promotions and notifications.
 */
const buildShopEvents = (shopId) => {
    const events = Event.get();
    const parsedId = parseInt(shopId, 10)
    return events.filter((event) => event.shopId === parsedId)
};

module.exports = {
    buildEvents: buildShopEvents,
    buildAnEvent,
};
