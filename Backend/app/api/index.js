const { Router } = require('express');
const PromotionsRouter = require('./promotions');
const InhabitantsRouter = require('./inhabitants');
const SellersRouter = require('./sellers');
const ShopsRouter = require('./shops');
const TownHallEmployeesRouter = require('./TownHallEmploye');
const CulturalActorsRouter = require('./CulturalActor');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/inhabitants', InhabitantsRouter);
router.use('/sellers', SellersRouter);
router.use('/shops', ShopsRouter);
router.use('/promotions', PromotionsRouter);
router.use('/townHallEmployees', TownHallEmployeesRouter);
router.use('/culturalActors', CulturalActorsRouter);

module.exports = router;
