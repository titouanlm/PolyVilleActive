const { Router } = require('express')
const { Inhabitant } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildInhabitants, buildAnInhabitant } = require('./manager')

const router = new Router()

router.get('/', (req, res) => {
    try {
        const inhabitants = buildInhabitants()
        res.status(200).json(inhabitants)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:inhabitantId', (req, res) => {
    try {
        const seller = buildAnInhabitant(req.params.inhabitantId)
        res.status(200).json(seller)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        console.log("Test")

        const inhabitant = Inhabitant.create({ ...req.body })
        res.status(201).json(inhabitant)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:inhabitantId', (req, res) => {
    try {
        res.status(200).json(Inhabitant.update(req.params.inhabitantId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:inhabitantId', (req, res) => {
    try {
        Inhabitant.delete(req.params.inhabitantId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
