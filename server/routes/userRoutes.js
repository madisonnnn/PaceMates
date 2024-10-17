const express = require('express')
const { createUser, showUser, listUsers, updateUser } = require('../controllers/userControllers')
const router = express.Router()

router.get('/', listUsers)
router.post('/', createUser)
router.get('/:id', showUser)
router.patch('/:id', updateUser)

module.exports = router