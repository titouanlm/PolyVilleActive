const { Router } = require('express');
const { TownHallEmployee } = require('../../models');
const manageAllErrors = require('../../utils/routes/error-management');

const router = new Router();

router.get('/', (req, res) => {
    try {
        const themployee = TownHallEmployee.get();
        res.status(200).json(themployee)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.get('/:themployeeId', (req, res) => {
    try {
        const themployee = TownHallEmployee.getById(req.params.themployeeId);
        res.status(200).json(themployee)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/', (req, res) => {
    try {
        const themployee = TownHallEmployee.create({ ...req.body });
        res.status(201).json(themployee)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.put('/:themployeeId', (req, res) => {
    try {
        res.status(200).json(TownHallEmployee.update(req.params.themployeeId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.delete('/:themployeeId', (req, res) => {
    try {
        TownHallEmployee.delete(req.params.themployeeId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/authenticate', (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        const themployee = TownHallEmployee.get().find(x => x.id === id);
        console.log(themployee);
        if (!themployee) { return error();
        }else{
            res.status(201).json(themployee)
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
