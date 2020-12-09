const { Router } = require('express')
const manageAllErrors = require('../../../../utils/routes/error-management')
const {Notification} = require('../../../../models')
const { buildNotifs, buildANotif } = require('./manager')


const router = new Router({ mergeParams: true })


router.get('/', (req, res) => {
    try {
        const notifs = buildNotifs()
        res.status(200).json(notifs)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:notifId', (req, res) => {
    try {
        const notif = buildANotif(req.params.eventId)
        res.status(200).json(notif)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const notif = Notification.create({ ...req.body })
        res.status(201).json(notif)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:notifId', (req, res) => {
    try {
        res.status(200).json(Notification.update(req.params.notifId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:notifId', (req, res) => {
    try {
        Shop.delete(req.params.notifId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
});

module.exports = router
