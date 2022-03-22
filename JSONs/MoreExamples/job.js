const org = {
    "_id": "o101",
    "name": "Wixer",
    "imgUrl": "http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg",
    "size": 2000,
}

const job = {
    "_id": "j101",
    "ownerId": "u101",
    "title": "Rock star full stack",
    "desc": "Develops new business by analyzing account potential; initiating, developing, and closing sales; recommending new applications and sales strategies.\nIdentifies potential in accounts by studying current business; interviewing key customer personnel and company personnel who have worked with customer; identifying and evaluating additional needs; analyzing opportunities.",
    "salary": 12000,
    "imgUrl": "https://ak1.picdn.net/shutterstock/videos/5898101/thumb/1.jpg",
    "org": {
        "_id": "o101",
        "name": "Wixer",
        "imgUrl": "http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576345445/k1cioaulnf5thlncx2yr.jpg"
    },
    "skills": [
        "4 Years React",
        "5 years web",
        "teamwork"
    ],
    "perks": [
        "paw",
        "bus"
    ],
    "loc": {
        lat: 11.11,
        lng: 22.22,
        name: "Tel Aviv"
    },
}

const appli = {
    "_id": "5de7f9cfe547562bf8f83ea0",
    "userId": "u101",
    "jobId": "j1001",
    "txt": "I am the best bla bla",
    "cv": "http://res.cloudinary.com/dvbqwqxqs/image/upload/v1576246263/psuyg118ti13uldh7mj3.pdf",
}

const user = {
    "_id": "u101",
    "fullname": "User 1",
    "imgUrl": "/img/img1.jpg",
    "isAdmin": false,
    "username": "user1",
    "password": "secret"
}

const activity = {
    "_id": "a101",
    "txt": "Viewed Job",
    "byUserId": "u101",
    "jobId": "j101"
}

