const { Router } = require('express');
const { Inhabitant } = require('../../models');
const AutorisationRouter  = require('./Autorisation');

const manageAllErrors = require('../../utils/routes/error-management');
const { manager } = require('./manager');
const router = new Router();

router.use('/:inhabitantId/autorisations', AutorisationRouter)


router.get('/', (req, res) => {
    try {
        const inhabitants = Inhabitant.get();
        res.status(200).json(inhabitants);
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.get('/:inhabitantId', (req, res) => {
    try {
        const inhabitant = Inhabitant.getById(req.params.inhabitantId);
        res.status(200).json(inhabitant)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/', (req, res) => {
    try {
        const inhabitant = Inhabitant.create({ ...req.body });
        res.status(201).json(inhabitant)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.put('/:inhabitantId', (req, res) => {
    try {
        console.log(req.body)
        console.log(req.params.inhabitantId)

        res.status(200).json(Inhabitant.update(req.params.inhabitantId, req.body))
    } catch (err) {
        console.log(err)
        manageAllErrors(res, err)
    }
});


router.delete('/:inhabitantId', (req, res) => {
    try {
        Inhabitant.delete(req.params.inhabitantId);
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/authenticate', (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        const inhabitant = Inhabitant.get().find(x => x.id === id);
        console.log(inhabitant);
        if (!inhabitant) { return error();
        }else{
            res.status(201).json(inhabitant)
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
