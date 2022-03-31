const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const userService = require('../user/user.service')

module.exports = {
  query,
  addMsg,
  // remove,
}

async function query(filterBy = {}) {
  const collection = await dbService.getCollection('msg')
  const msgs = await collection.find(criteria).toArray()
  return msgs
}

async function getById(msgId) {
  try {
    const collection = await dbService.getCollection('msg')
    const msg = collection.findOne({ _id: ObjectId(msgId) })
    return msg
  } catch (err) {
    logger.error(`while finding msg ${msgId}`, err)
    throw err
  }
}

async function addMsg(msg) {
  // const msgToAdd = {
  //   userId: ObjectId(msg.userId),
  //   toyId: ObjectId(msg.toyId),
  //   content: msg.content,
  //   rate: msg.rate,
  // }

  const collection = await dbService.getCollection('msg')
  const addedMsg = await collection.insertOne(msg)

  msg._id = addedMsg.insertedId
  return msg
}

// async function remove(msgId) {
//   try {
//     console.log(msgId);
//     const collection = await dbService.getCollection('msgs')
//     const criteria = { _id: ObjectId(msgId) }
//     await collection.deleteOne(criteria)
//   } catch (err) {
//     logger.error(`cannot remove msg ${msgId}`, err)
//     throw err
//   }
// }

function _buildCriteria(filterBy) {
  if (filterBy.userId) {
    return { userId: ObjectId(filterBy.userId) }
  } else if (filterBy.toyId) {
    return { toyId: ObjectId(filterBy.toyId) }
  }
  return {}
}
