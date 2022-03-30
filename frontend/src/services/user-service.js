import { utilService } from './util-service';
import { httpService } from './http-service';
import { storageService } from './async-storage-service';

const ENDPOINT = 'auth'
const KEY = 'users_db';
const LOGED_KEY = 'loged_user';

export const userService = {
  login,
  signup,
  logout,
  getGuestUser,
  getById,
}

_createUsers();

async function login(cred) {
  return await httpService.post(ENDPOINT + '/login', cred)

  // try {
  //   console.log('service login cred:', cred);
  //   const user = await getByUsername(cred.username)
  //   if (!user) {
  //     return Promise.reject('Invalid username or password')
  //   }

  //   const match = user.password === cred.password
  //   if (!match) {
  //     return Promise.reject('Invalid username or password')
  //   }
  //   delete user.password
  //   utilService.saveToSessionStorage(LOGED_KEY, user);
  //   return user
  // }
  // finally { }
}

async function signup(cred) {
  return await httpService.post(ENDPOINT + '/signup', cred)

  // return storageService.post(KEY, cred)

}

async function signupCheck(username) {
  console.log('signup 2', username);
  const user = await getByUsername(username)
  console.log('signup 3', user);
  if (user) {
    console.log('signup user ex', user);
    return false
  }
  return true
}

async function logout() {
  // sessionStorage.removeItem(LOGED_KEY);
  return await httpService.post(ENDPOINT + '/logout')
}

async function getById(id) {
  return await httpService.get(`${ENDPOINT}/${id}`)
  // return axios.get(BASE_URL + id).then((res) => res.data)
  // return storageService.getById(KEY, id);
}

async function getByUsername(username) {
  try {
    const users = await storageService.query(KEY)
    const user = users.find(user => user.username === username)
    return user
  } catch (err) {
    console.error(`while finding user ${username}`, err)
    throw err
  }
}

function getGuestUser() {
  return {
    fullname: 'Guest User',
    username: 'guest',
    password: 'guest',
    isAdmin: true,
  }
}


function _createUsers() {
  let users = utilService.loadFromStorage(KEY);
  if (!users || !users.length) {
    const users = [
      {
        "_id": "5139939s1",
        "fullname": "Patty And Beckett",
        "imgUrl": "/src/assets/images/profilePics/1.jpg",
        "isAdmin": false,
        "username": "patty",
        "password": "p111"
      },
      {
        "_id": "51399391",
        "fullname": "Angel",
        "imgUrl": "/src/assets/images/profilePics/1.jpg",
        "isAdmin": false,
        "username": "angel",
        "password": "a111"
      },
      {
        "_id": "51399392",
        "fullname": "Maria",
        "imgUrl": "/src/assets/images/profilePics/1.jpg",
        "isAdmin": false,
        "username": "maria",
        "password": "m111"
      },
      {
        "_id": "51399393",
        "fullname": "Shaila & Alex",
        "imgUrl": "/src/assets/images/profilePics/1.jpg",
        "isAdmin": false,
        "username": "shaila",
        "password": "s111"
      },
      {
        "_id": "51399394",
        "fullname": "Marián",
        "imgUrl": "/src/assets/images/profilePics/1.jpg",
        "isAdmin": false,
        "username": "marian",
        "password": "m111"
      },
      {
        "_id": "51399395",
        "fullname": "Isabel",
        "imgUrl": "/src/assets/images/profilePics/1.jpg",
        "isAdmin": false,
        "username": "isabel",
        "password": "i111"
      },
    ]
    utilService.saveToStorage(KEY, users);
  }
  return users;
}
