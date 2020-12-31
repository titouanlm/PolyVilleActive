const { Router } = require('express');
const { ShowHall } = require('../../models');
const manageAllErrors = require('../../utils/routes/error-management');

const router = new Router();

router.get('/', (req, res) => {
    try {
        const showHalls = ShowHall.get();
        res.status(200).json(showHalls)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.get('/:showHallId', (req, res) => {
    try {
        const showHall = ShowHall.getById(req.params.showHallId);
        res.status(200).json(showHall)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/', (req, res) => {
    try {
        const showHall = ShowHall.create({ ...req.body });
        res.status(201).json(showHall)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.put('/:showHallId', (req, res) => {
    try {
        res.status(200).json(ShowHall.update(req.params.showHallId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.delete('/:showHallId', (req, res) => {
    try {
        ShowHall.delete(req.params.showHallId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
});


module.exports = router;
