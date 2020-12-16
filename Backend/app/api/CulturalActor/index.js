const { Router } = require('express');
const { CulturalActor } = require('../../models');
const manageAllErrors = require('../../utils/routes/error-management');
const CustomEventRouter  = require('./CulturalEvent');


const router = new Router();
router.use('/:cactorId/culturalEvents', CustomEventRouter)

router.get('/', (req, res) => {
    try {
        const cActors = CulturalActor.get();
        res.status(200).json(cActors)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.get('/:cactorId', (req, res) => {
    try {
        const cActor = CulturalActor.getById(req.params.cactorId);
        res.status(200).json(cActor)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/', (req, res) => {
    try {
        const cactor = CulturalActor.create({ ...req.body });
        res.status(201).json(cactor)
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.put('/:cactorId', (req, res) => {
    try {
        res.status(200).json(CulturalActor.update(req.params.cactorId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.delete('/:cactorId', (req, res) => {
    try {
        CulturalActor.delete(req.params.cactorId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
});

router.post('/authenticate', (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        const cactor = CulturalActor.get().find(x => x.id === id);
        console.log(cactor);
        if (!cactor) { return error();
        }else{
            res.status(201).json(cactor)
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
