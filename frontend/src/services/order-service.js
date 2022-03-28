// import axios from 'axios'
import { utilService } from './util-service';
// import { httpService } from './http-service';
import { storageService } from './async-storage-service';
import { userService } from './user-service';
import { stayService } from './stay-service';



const KEY = 'orders_db';


const ENDPOINT = 'order';
// const BASE_URL =
//   process.env.NODE_ENV !== 'development' ? '/api/order' : '//localhost:3030/api/order/'

export const orderService = {
  query,
  getById,
  remove,
  save,
  getEmptyOrder,
};

// _createOrders();

async function query(filterBy = {}) {

  try {
    var orders = await storageService.query(KEY);

    orders = orders.filter((order) => order.hostId === filterBy._id);
    // if (filterBy.destination) {
    //   const regex = new RegExp(filterBy.destination, 'i');
    //   orders = orders.filter((order) => regex.test(order.loc.country) || regex.test(order.loc.city));
    // }
    // if (filterBy.guests) {
    //   orders = orders.filter((order) => order.capacity >= filterBy.guests);
    // }
    // if (filterBy.amenities) {
    //   if (typeof (filterBy.amenities) === 'object')
    //     var amenitiesToFilter = Object.values(filterBy.amenities);
    //   else var amenitiesToFilter = filterBy.amenities;
    //   if (typeof (amenitiesToFilter) === 'string') {
    //     amenitiesToFilter = [amenitiesToFilter];
    //   }
    //   console.log('serv amenities', amenitiesToFilter);

    //   orders = orders.filter((order) => {
    //     return amenitiesToFilter.every((amenitie) => {
    //       return order.amenities.includes(amenitie);
    //     });
    //   });
    // }
    // if (filterBy.maxPrice && filterBy.minPrice) {
    //   console.log('serv price', filterBy.minPrice, filterBy.maxPrice);
    //   orders = orders.filter((order) => (order.price >= filterBy.minPrice) && (order.price <= filterBy.maxPrice));
    // }
    return orders;
  }
  finally {
    // console.log('f orders:', orders);
  }

  // console.log('order service filter: ', filterBy);

}

async function getById(id) {
  // return await httpService.get(`${ENDPOINT}/${id}`)
  // return axios.get(BASE_URL + id).then((res) => res.data)
  return storageService.getById(KEY, id);
}

async function remove(id) {
  // return await httpService.delete(`${ENDPOINT}/${id}`)
  // return axios.delete(BASE_URL + id).then((res) => res.data)
  return storageService.remove(KEY, id);
}

async function save(order) {
  var orderToSave = order._id ? order : await getEmptyOrder(order);
  // return order._id
  // ? await httpService.put(`${ENDPOINT}/${order._id}`, order)
  // : await httpService.post(ENDPOINT, order)
  return orderToSave._id ? storageService.put(KEY, orderToSave) : storageService.post(KEY, orderToSave);
}

async function getEmptyOrder(order) {
  const buyer = await userService.getById(order.buyerId);
  const stay = await stayService.getById(order.stayId);
  return Promise.resolve({
    "_id": '',
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



function _createOrders() {
  let orders = utilService.loadFromStorage(KEY);
  if (!orders || !orders.length) {
    orders = [];
    utilService.saveToStorage(KEY, orders);
  }
  return orders;
}


