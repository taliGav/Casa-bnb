import { httpService } from './http-service'

const ENDPOINT = 'msg'

export const msgService = {
  query,
  queryAll,
  addMsg,
  removeMsg,
  getEmptyMsg,
  getChat,
}

async function query(userId) {
  return await httpService.get(`${ENDPOINT}` + '/', userId)
}

async function queryAll(userId) {
  return await httpService.get(`${ENDPOINT}/${userId}`)
}

async function addMsg(msg, topic) {
  return await httpService.post(ENDPOINT, {msg,topic})
}

async function removeMsg(msgId) {
  return await httpService.delete(`${ENDPOINT}/${msgId}`, msgId)
}

async function getChat(topic) {
  return await httpService.get(`${ENDPOINT}/${topic}`)
}

function getEmptyMsg() {
  return Promise.resolve({
    txt: '',
    topic: '',
    by: {
      _id: '',
      name: ''
    },
  })
}
