// Guidlines:
// *. currently no better API than youtube...
// *. no need for song store, it is part of the station

// Pages, Cmps:
// HomePage render 2 stations => link StationDetails
// Add station
// AppPlayer (initially rendered at StationDetails, later in footer)
//   Smart component - connected to store:
//   -. stationModule.currentlyPlayingUrl
//   -. stationModule.dispatch(nextSong)
// Filtering
// StationList, StationPreview
// StationDetails - Make it amazing
// D & D Later....


// server.js
var gStationLiveUsers = {
  stationId : 4
}

var station = {
  "_id": "5cksxjas89xjsa8xjsa8jxs09",
  "name": "Funky Monks",
  "tags": [
    "Funk",
    "Happy"
  ],
  "createdAt": 1541652422,
  "createdBy": {
    "_id": "u101",
    "fullname": "Puki Ben David",
    "imgUrl": "http://some-photo/"
  },
  "likedByUsers": ['{minimal-user}', '{minimal-user}'],
  "songs": [
    {
      "id": "s1001",
      "title": "The Meters - Cissy Strut",
      "url": "youtube/song.mp4",
      "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
      "addedBy": '{minimal-user}',
      "addedAt": 162521765262
    },
    {
      "id": "mUkfiLjooxs",
      "title": "The JB's - Pass The Peas",
      "url": "youtube/song.mp4",
      "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
      "addedBy": {}
    },
  ],
  "msgs": [
    {
      id: 'm101',
      from: '{mini-user}',
      txt: 'Manish?'
    }
  ]
}

const user = {}
