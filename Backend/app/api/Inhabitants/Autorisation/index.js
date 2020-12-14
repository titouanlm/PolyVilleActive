const { Router } = require('express');
const manageAllErrors = require('../../../utils/routes/error-management')
const {Autorisation} = require('../../../models')

const router = new Router({ mergeParams: true });

router.get('/', (req, res) => {
    try {
        const autorisations = buildAutorisations()
        res.status(200).json(autorisations)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:autorisationId', (req, res) => {
    try {
        const autorisation = buildAnAutorisation(req.params.autorisationId)
        res.status(200).json(autorisation)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const event = Autorisation.create({ ...req.body })
        res.status(201).json(event)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:autorisationId', (req, res) => {
    try {
        res.status(200).json(Event.update(req.params.autorisationId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:autorisationId', (req, res) => {
    try {
        Autorisation.delete(req.params.autorisationId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router

