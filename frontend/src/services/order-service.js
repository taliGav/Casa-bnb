import { utilService } from './util-service';
import { httpService } from './http-service';
import { storageService } from './async-storage-service';
import { userService } from './user-service';
import { stayService } from './stay-service';


const KEY = 'orders_db';
const ENDPOINT = 'order';

export const orderService = {
  query,
  getById,
  remove,
  save,
  getEmptyOrder,
};

async function query(filterBy = {}) {
  return await httpService.post(`${ENDPOINT}` + '/')

  // try {
  //   var orders = await storageService.query(KEY);
  //   return orders;
  // }
  // finally {
  // console.log('f orders:', orders);
  // }

  // console.log('order service filter: ', filterBy);

}

async function getById(id) {
  return await httpService.get(`${ENDPOINT}/${id}`)
  // return storageService.getById(KEY, id);
}

async function remove(id) {
  return await httpService.delete(`${ENDPOINT}/${id}`)
  // return storageService.remove(KEY, id);
}

async function save(order) {
  console.log('order serv add order1:', order);

  // var orderToSave = order._id ? order : await getEmptyOrder(order)
  // console.log('order serv add order2:', orderToSave);
  return order._id
    ? await httpService.put(`${ENDPOINT}/${order._id}`, order)
    : await httpService.post(`${ENDPOINT}`, order)
  // return orderToSave._id ? storageService.put(KEY, orderToSave) : storageService.post(KEY, orderToSave);
}

async function getEmptyOrder(order) {
  console.log('order serv empty order:', order);
  const buyer = await userService.getById(order.buyerId);
  console.log('order serv empty buyer:', buyer);

  const stay = await stayService.getById(order.stayId);
  console.log('order serv empty stay:', stay);

  return Promise.resolve({
    "hostId": order.hostId,
    "createdAt": Date.now(),
    "buyer": {
      "_id": buyer._id,
      "fullname": buyer.fullname
    },
    "totalPrice": order.totalPrice,
    "startDate": order.startDate,
    "endDate": order.endDate,
    "guests": order.guests,
    "stay": {
      "_id": stay._id,
      "name": stay.name,
      "price": stay.price
    },
    "status": "pending"
  });
}


