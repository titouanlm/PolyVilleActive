const { Router } = require('express')
const { Event } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const { buildEvents, buildAnEvent } = require('./manager')
const NotificationsRouter = require('./notifications')


const router = new Router({ mergeParams: true })

router.use('/:eventId/notifications', NotificationsRouter)


router.get('/', (req, res) => {
    try {
        const events = buildEvents(req.params.shopId)
        res.status(200).json(events)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:eventId', (req, res) => {
    try {

        const event = buildAnEvent(req.params.eventId,req.params.shopId)
        res.status(200).json(event)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const event = Event.create({ ...req.body })
        res.status(201).json(event)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:eventId', (req, res) => {
    try {
        res.status(200).json(Event.update(req.params.eventId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:eventId', (req, res) => {
    try {
        Shop.delete(req.params.eventId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
