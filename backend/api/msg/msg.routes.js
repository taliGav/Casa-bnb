const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getMsgs, addMsg,getChat } = require('./msg.controller')
const router = express.Router()

router.get('/', getMsgs)
// router.get('/', getMsgs)
router.get('/:topic', getChat)
// router.delete('/:id', requireAuth, deleteMsg)

module.exports = router
