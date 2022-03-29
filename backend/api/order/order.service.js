const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
}

async function query(filterBy) {
  try {
    // console.log('back order serv filter:', filterBy);
    // const criteria = _buildCriteria(filterBy)
    // const criteria = {}
    // console.log('back order serv criteria:', criteria);
    const collection = await dbService.getCollection('order')
    var orders = await collection.find().toArray()
    // console.log('back order serv orders:', orders);
    return orders
  } catch (err) {
    logger.error('cannot find orders', err)
    throw err
  }
}

async function getById(orderId) {
  try {
    const collection = await dbService.getCollection('order')
    const order = collection.findOne({ _id: ObjectId(orderId) })
    return order
  } catch (err) {
    logger.error(`while finding order ${orderId}`, err)
    throw err
  }
}

async function remove(orderId) {
  try {
    const collection = await dbService.getCollection('order')
    await collection.deleteOne({ _id: ObjectId(orderId) })
    return orderId
  } catch (err) {
    logger.error(`cannot remove order ${orderId}`, err)
    throw err
  }
}

async function add(order) {
  try {
    const collection = await dbService.getCollection('order')
    const addedOrder = await collection.insertOne(order)
    return addedOrder
  } catch (err) {
    logger.error('cannot insert order', err)
    throw err
  }
}

async function update(order) {
  try {
    var id = ObjectId(order._id)
    delete order._id
    const collection = await dbService.getCollection('order')
    await collection.updateOne({ _id: id }, { $set: { ...order } })
    return order
  } catch (err) {
    logger.error(`cannot update order ${order._id}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}

  if (filterBy.destination) {
    const regex = new RegExp(filterBy.destination, 'i');
    criteria["loc.country"] = { $regex: regex }
  }
  if (filterBy.guests) {
    criteria.capacity = { $gte: +filterBy.guests }
  }
  if (filterBy.amenities) {
    if (typeof (filterBy.amenities) === 'object')
      var amenitiesToFilter = Object.values(filterBy.amenities);
    else var amenitiesToFilter = filterBy.amenities;
    if (typeof (amenitiesToFilter) === 'string') {
      amenitiesToFilter = [amenitiesToFilter];
    }
    criteria.amenities = { $all: (amenitiesToFilter) }
  }
  if (filterBy.maxPrice && filterBy.minPrice) {
    criteria.price = { $lte: JSON.parse(filterBy.maxPrice), $gte: JSON.parse(filterBy.minPrice) }
  }

  return criteria
}
