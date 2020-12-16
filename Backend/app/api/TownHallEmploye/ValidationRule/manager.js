const {TownHallEmployee,ValidationRule } = require('../../../models')

/**
 * Function buildARule.
 * This function return a Validation Rule.
 * @param thempId
 * @param ruleId
 */
const buildARule = (thempId,ruleId) => {
    const rule = ValidationRule.getById(ruleId);
    const themployee = TownHallEmployee.getById(thempId);
    const thempIdInt = parseInt(thempId, 10);
    if (rule.thEmployeeId!== thempIdInt) throw new NotFoundError(`$id=${ruleId} was not found for ${themployee.name}`);
    return rule;
};

/**
 * Function  buildActorRules.
 * This function build all Rules.
 */
const buildActorRules = (thempId) => {
    const rules = CulturalEvent.get()
    const parsedId = parseInt(thempId, 10)
    return rules.filter((rule) =>rule.thEmployeeId === parsedId)
}

module.exports = {
    buildActorRules,
    buildARule,
}
