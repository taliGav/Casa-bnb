const eventi = {
  "_id": "ev101",
  "title": "The best of Shahar Hason",
  "description": "Proident duis ex ullamco nostrud deserunt sunt in. Occaecat Lorem aliqua ex aliqua excepteur proident nostrud adipisicing id ullamco. Aliqua sunt exercitation tempor deserunt culpa sint ex sunt anim.",
  "createdAt": 121221453343,
  "createdBy": {
    "_id": "u101",
    "fullname": "Puki Muki",
    "imgUrl": "https://image.shutterstock.com/image-photo/portrait-smiling-red-haired-millennial-260nw-1194497251.jpg"
  },
  "startsAt": 12122212134,
  "loc": {
    "lat": 35.42,
    "lng": 34.22,
    "address": "13 Alenby, Tel-Aviv"
  },
  "imgUrls": ["primary.jpg", "secondary1.jpg", "secondary2.jpg"],
  "capacity": 100,
  "price": 20,
  "tags": ["Fun", "Children"],
  "activatedAt": 3653722,
  "members": [
    {
      "_id": "u104",
      "fullname": "Suki",
      "imgUrl": "http://some-img"
    },
    {
      "_id": "u103",
      "fullname": "Kuki",
      "imgUrl": "http://some-img"
    }
  ],
  "posts": [
    {
      "id": "r3243",
      "createdAt": 12122134434,
      "author": {
        "_id": "u103",
        "fullname": "Kuki",
        "imgUrl": "http://some-img"
      },
      "txt": "good event!"
    }
  ]
}

const user = {
  "_id": "u101",
  "createdAt": 12122134434,
  "fullname": "Puki Muki",
  "username": "muki",
  "password": "123456",
  "isAdmin": true,
  "imgUrl": "http://some-img",
  "followers": [
    {
      "_id": "u104",
      "fullname": "Suki",
      "imgUrl": "http://some-img"
    }
  ],
  "following": [
    {
      "_id": "u105",
      "fullname": "Bob",
      "imgUrl": "http://some-img"
    }
  ]
}

