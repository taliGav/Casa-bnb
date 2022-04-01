const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getMsgs, addMsg,getChat,getAllChats } = require('./msg.controller')
const router = express.Router()

router.get('/', getAllChats)
// router.get('/', getMsgs)
router.get('/:topic', getChat)
// router.get('/:userId', getAllChats)
// router.delete('/:id', requireAuth, deleteMsg)

module.exports = router
