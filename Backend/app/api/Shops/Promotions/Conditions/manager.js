const {Condition} = require('../../../../models');

/**
 * Function buildACondition.
 * This function build a Condition
 * @param conditionId
 * @param promotionId
 */
const buildACondition = (conditionId,promotionId) => {
    const condition=Condition.getById(conditionId);
    const promotion=Promotion.getById(promotionId);
    const promoIdInt=parseInt(promotionId);

    if(condition.promoId!==promoIdInt) throw new NotFoundError('condition id=${conditionId} not found for promotionId=${promotionId}');

    return condition;
};


/**
 * Function  buildConditions.
 * This function build all conditions.
 */
const buildConditions = (promotionId) => {
    const conditions=Condition.get();
    const promoIdInt=parseInt(promotionId,10);
    return conditions.filter((condition) => condition.promoId === promoIdInt)

};

module.exports = {
    buildACondition,
    buildConditions,
};

