const { Router } = require('express')
const manageAllErrors = require('../../../utils/routes/error-management')
const { CulturalEvent } = require('../../../models')
const { buildActorCulturalEvents, buildACulturalEvent } = require('./manager')


const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
    try {
        const cvents = buildActorCulturalEvents(req.params.cactorId)
        res.status(200).json(cvents)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:ceventId', (req, res) => {
    try {
        const cvent = buildACulturalEvent(req.params.cactorId,req.params.ceventId)
        res.status(200).json(cvent)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const cevent = CulturalEvent.create({ ...req.body })
        res.status(201).json(cevent)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:ceventId', (req, res) => {
    try {
        res.status(200).json(CulturalEvent.update(req.params.ceventId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:ceventId', (req, res) => {
    try {
        CulturalEvent.delete(req.params.ceventId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
