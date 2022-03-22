// import axios from 'axios'
import { utilService } from './util-service'
import { httpService } from './http-service'
import { storageService } from './async-storage-service'
const fs = require('fs')

const gStays = require('../../data/stay.json')


const KEY = 'stays_db'
const ENDPOINT = 'stay'
// const BASE_URL =
//   process.env.NODE_ENV !== 'development' ? '/api/stay' : '//localhost:3030/api/stay/'

export const stayService = {
  query,
  getById,
  remove,
  save,
  getEmptyStay,
  getlabels,
}

_createStays()

async function query(filterBy = {}) {
  // return await httpService.get(ENDPOINT, filterBy)
  // return axios.get(BASE_URL, { params: { filterBy } }).then((res) => res.data)
  return storageService.query(KEY)
}

async function getById(id) {
  // return await httpService.get(`${ENDPOINT}/${id}`)
  // return axios.get(BASE_URL + id).then((res) => res.data)
  return storageService.getById(KEY, id)
}

async function remove(id) {
  // return await httpService.delete(`${ENDPOINT}/${id}`)
  // return axios.delete(BASE_URL + id).then((res) => res.data)
  return storageService.remove(KEY, id)
}

async function save(stay) {
  // return stay._id
  // ? await httpService.put(`${ENDPOINT}/${stay._id}`, stay)
  // : await httpService.post(ENDPOINT, stay)
  return stay._id ? storageService.put(KEY, stay) : storageService.post(KEY, stay)
}

function getEmptyStay() {
  return Promise.resolve({
    name: '',
    price: 0,
    labels: [],
    createdAt: new Date(),
    inStock: true,
    reviews: [],
  })
}

function getlabels() {
  return labels
}

function _createStays() {
  let stays = utilService.loadFromStorage(KEY)
  if (!stays || !stays.length) {
    utilService.saveToStorage(KEY, gStays)
  }
  return stays
}

// function _createStay(name, price, labels, reviews) {
//   return {
//     _id: utilService.makeId(),
//     name,
//     price,
//     labels,
//     inStock: true,
//     createdAt: new Date(),
//     reviews: [
//       { _id: utilService.makeId(), txt: utilService.getLoremIpsum(5), createdAt: new Date() },
//       { _id: utilService.makeId(), txt: utilService.getLoremIpsum(5), createdAt: new Date() },
//       { _id: utilService.makeId(), txt: utilService.getLoremIpsum(5), createdAt: new Date() },
//     ],
//   }
// }
