const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getMsgs, addMsg,getChat,getAllChats } = require('./msg.controller')
const router = express.Router()

router.get('/', getAllChats)
router.get('/:topic', getChat)
router.post('/', addMsg)



module.exports = router
