const { Router } = require('express')
const manageAllErrors = require('../../../utils/routes/error-management')
const { Niche } = require('../../../models')
const { buildShopNiches, buildANiche } = require('./manager')


const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
    try {
        const promos = buildShopNiches(req.params.shopId)
        res.status(200).json(promos)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:eventId', (req, res) => {
    try {
        const promo = buildANiche(req.params.shopId,req.params.eventId)
        res.status(200).json(promo)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const promo = Niche.create({ ...req.body })
        res.status(201).json(promo)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:nicheId', (req, res) => {
    try {
        res.status(200).json(Niche.update(req.params.nicheId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:nicheId', (req, res) => {
    try {
        Shop.delete(req.params.nicheId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
