const { Router } = require('express')
const manageAllErrors = require('../../utils/routes/error-management')
const { ProhibitionRule } = require('../../models')
const { buildActorRules, buildARule } = require('./manager')


const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
    try {
        const rules = ProhibitionRule.get();
        res.status(200).json(rules)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.get('/:ruleId', (req, res) => {
    try {
        const rule = ProhibitionRule.getById(ruleId);
        res.status(200).json(rule)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/', (req, res) => {
    try {
        const rule = ProhibitionRule.create({ ...req.body })
        res.status(201).json(rule)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:ruleId', (req, res) => {
    try {
        buildARule(req.params.thEmployeeId,req.params.ruleId)
        res.status(200).json(ProhibitionRule.update(req.params.ruleId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:ruleId', (req, res) => {
    try {
        ProhibitionRule.delete(req.params.ruleId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
