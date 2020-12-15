const { Router } = require('express');
const { Promotion } = require('../../models');
const manageAllErrors = require('../../utils/routes/error-management');
const { buildPromos, buildAPromo } = require('./manager');

const router = new Router();

router.get('/', (req, res) => {
    try {
        const promos = buildPromos();
        res.status(200).json(promos)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.get('/:promoId', (req, res) => {
    try {
        const promo = buildAPromo(req.params.promoId);
        res.status(200).json(promo)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/', (req, res) => {
    try {
        const promo = Promotion.create({ ...req.body });
        res.status(201).json(promo)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.put('/:promoId', (req, res) => {
    try {
        res.status(200).json(Promotion.update(req.params.promoId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.delete('/:promoId', (req, res) => {
    try {
        Shop.delete(req.params.promoId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
