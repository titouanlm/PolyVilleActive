const { Router } = require('express')
const manageAllErrors = require('../../../utils/routes/error-management')
const { Promotion } = require('../../../models')
const { buildPromos, buildAPromo } = require('./manager')


const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
    try {
        const promos = Promotion.get()
        res.status(200).json(promos)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:promoId', (req, res) => {
    try {
        const promo = Promotion.getById(req.params.promoId)
        res.status(200).json(promo)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const promo = Promotion.create({ ...req.body, shopId: parseInt(req.params.shopId) })
        res.status(201).json(promo)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:promoId', (req, res) => {
    try {
        res.status(200).json(Promotion.update(req.params.promoId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:promoId', (req, res) => {
    try {
        Shop.delete(req.params.promoId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
