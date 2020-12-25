const Event = require('./Event.model.js');
const Shop = require('./Shop.model.js');
const Promotion = require('./Promotion.model.js');
const Notification = require('./Notification.model.js');
const Seller = require('./Seller.model.js');
const Inhabitant = require('./Inhabitant.model.js');
const Niche = require('./Niche.model.js');
const Autorisation = require('./Autorisation.model.js');
const TownHallEmployee= require('./TownHallEmployee.model')
const CulturalActor = require('./CulturalActor.model')
const CulturalEvent = require('./CulturalEvent.model')
const ProhibitionRule = require('./ProhibitionRule.model')
const Condition = require('./Condition.model')

module.exports = {
    Event,Shop,Seller,Promotion,Notification,Inhabitant,Niche,Autorisation,TownHallEmployee,CulturalActor,CulturalEvent,ProhibitionRule,Condition
};
