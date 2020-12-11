const { Router } = require('express');
const { Seller } = require('../../models');
const manageAllErrors = require('../../utils/routes/error-management');
const { buildSellers, buildASeller } = require('./manager');

const router = new Router();

router.get('/', (req, res) => {
    try {
        const sellers = Seller.get();
        res.status(200).json(sellers)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.get('/:sellerId', (req, res) => {
    try {
        const seller = Seller.getById(req.params.id);
        res.status(200).json(seller)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/', (req, res) => {
    try {
        const seller = Seller.create({ ...req.body });
        res.status(201).json(seller)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.put('/:sellerId', (req, res) => {
    try {
        res.status(200).json(Shop.update(req.params.sellerId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.delete('/:shopId', (req, res) => {
    try {
        Shop.delete(req.params.shopId);
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
});

module.exports = router;
