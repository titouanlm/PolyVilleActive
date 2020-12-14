const { Router } = require('express');
const PromotionsRouter = require('./promotions');
const InhabitantsRouter = require('./inhabitants');
const SellersRouter = require('./sellers');
const ShopsRouter = require('./shops');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/inhabitants', InhabitantsRouter);
router.use('/sellers', SellersRouter);
router.use('/shops', ShopsRouter);

module.exports = router;
