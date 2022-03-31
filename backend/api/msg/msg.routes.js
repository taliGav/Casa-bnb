const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getMsgs, addMsg } = require('./msg.controller')
const router = express.Router()

router.get('/', getMsgs)
router.post('/', addMsg)
// router.delete('/:id', requireAuth, deleteMsg)

module.exports = router
