const { Router } = require('express');
const { Shop } = require('../../models');
const manageAllErrors = require('../../utils/routes/error-management');
const NichesRouter = require('./niches');
const EventsRouter = require('./events');
const { buildShops, buildAShop } = require('./manager');

const router = new Router();

router.use('/:shopId/events', EventsRouter);
router.use('/:shopId/niches', NichesRouter);


router.get('/', (req, res) => {
    try {
        const quizzes = buildShops();
        res.status(200).json(quizzes)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.get('/:shopId', (req, res) => {
    try {
        const shop = buildAShop(req.params.shopId);
        res.status(200).json(shop)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/', (req, res) => {
    try {
        const shop = Shop.create({ ...req.body });
        res.status(201).json(shop)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.put('/:shopId', (req, res) => {
    try {
        res.status(200).json(Shop.update(req.params.shopId, req.body))
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


router.post('/verify', (req, res) => {
    try {
        const { label } = req.body;
        const shop = Shop.get().find(x => x.label === label);
        if (!shop) { return error();
        }else{
            res.status(201).json(shop)
        }
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json(err.extra)
        } else {
            res.status(500).json(err)
        }
    }
});

module.exports = router;
