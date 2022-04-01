import { httpService } from './http-service'

const ENDPOINT = 'msg'

export const msgService = {
  query,
  addMsg,
  removeMsg,
  getEmptyMsg,
  getChat,
}

async function query(topic) {
  return await httpService.get(ENDPOINT, topic)
}

async function addMsg(msg) {
  return await httpService.post(ENDPOINT, msg)
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
