// import { httpService } from './http-service'

const ENDPOINT = 'msg'

export const msgService = {
  query,
  addMsg,
  removeMsg,
  getEmptyMsg,
}

async function query(filterBy) {
  return await httpService.get(ENDPOINT, filterBy)
}

async function addMsg(msg) {
  return await httpService.post(ENDPOINT, msg)
}

async function removeMsg(msgId) {
  return await httpService.delete(`${ENDPOINT}/${msgId}`, msgId)
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
