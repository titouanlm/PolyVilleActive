const { Router } = require('express');
const manageAllErrors = require('../../../../utils/routes/error-management')
const {Condition} = require('../../../../models')
const {buildConditions,buildACondition}= require('./manager')

const router = new Router({ mergeParams: true });

router.get('/', (req, res) => {
    try {
        const conditions=buildConditions(req.params.promoId);
        res.status(200).json(conditions);
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:conditionId', (req, res) => {
    try {
        const condition = buildACondition(req.params.conditionId,req.params.promoId)
        res.status(200).json(condition)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {

    try {
        const condition = Condition.create({ ...req.body })
        res.status(201).json(condition)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:conditionId', (req, res) => {
    try {
        res.status(200).json(Condition.update(req.params.conditionId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:conditionId', (req, res) => {

    try {
        Condition.delete(req.params.conditionId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router

