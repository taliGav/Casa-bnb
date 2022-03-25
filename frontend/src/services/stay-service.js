// import axios from 'axios'
import { utilService } from './util-service';
// import { httpService } from './http-service';
import { storageService } from './async-storage-service';



const KEY = 'stays_db';
const amenities = [
  "TV",
  "Internet",
  "Wifi",
  "Air conditioning",
  "Wheelchair accessible",
  "Pool",
  "Kitchen",
  "Free parking on premises",
  "Gym",
  "Elevator",
  "Hot tub",
  "Washer",
  "Smoke detector",
  "Self check-in",
  "Waterfront",
  "Beachfront"
];
const lessAmenities = [
  "Free cancellation",
  "Wifi",
  "Kitchen",
  "Air conditioning",
  "Washer",
];
const ENDPOINT = 'stay';
// const BASE_URL =
//   process.env.NODE_ENV !== 'development' ? '/api/stay' : '//localhost:3030/api/stay/'

export const stayService = {
  query,
  getById,
  remove,
  save,
  getEmptyStay,
  getAmenities,
  getLessAmenities,
};

_createStays();

function getAmenities() {
  return amenities;
}
function getLessAmenities() {
  return lessAmenities;
}

async function query(filterBy = {}) {
  // return await httpService.get(ENDPOINT, filterBy)
  // return axios.get(BASE_URL, { params: { filterBy } }).then((res) => res.data)
  try {
    var stays = await storageService.query(KEY);
    // console.log('serv filter:', filterBy.amenities);
    if (filterBy.destination) {
      // console.log('regex', filterBy.destination);
      const regex = new RegExp(filterBy.destination, 'i');
      stays = stays.filter((stay) => regex.test(stay.loc.country) || regex.test(stay.loc.city));
    }
    if (filterBy.guests) {
      // console.log('guests', filterBy.guests);
      stays = stays.filter((stay) => stay.capacity >= filterBy.guests);
    }
    if (filterBy.amenities) {
      if (typeof (filterBy.amenities) === 'object')
        var amenitiesToFilter = Object.values(filterBy.amenities);
      else var amenitiesToFilter = filterBy.amenities;
      if (typeof (amenitiesToFilter) === 'string') {
        amenitiesToFilter = [amenitiesToFilter];
      }
      console.log('serv amenities', amenitiesToFilter);

      stays = stays.filter((stay) => {
        return amenitiesToFilter.every((amenitie) => {
          return stay.amenities.includes(amenitie);
        });
      });
    }
    return stays;
  }
  finally {
    // console.log('f stays:', stays);
  }

  // console.log('stay service filter: ', filterBy);

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

async function save(stay) {
  // return stay._id
  // ? await httpService.put(`${ENDPOINT}/${stay._id}`, stay)
  // : await httpService.post(ENDPOINT, stay)
  return stay._id ? storageService.put(KEY, stay) : storageService.post(KEY, stay);
}

function getEmptyStay() {
  return Promise.resolve({
    name: '',
    price: 0,
    labels: [],
    createdAt: new Date(),
    inStock: true,
    reviews: [],
  });
}

// function getlabels() {
//   return labels
// }

// function _createStays() {
//   let stays = utilService.loadFromStorage(KEY)
//   if (!stays || !stays.length) {
//     utilService.saveToStorage(KEY, gStays)
//   }
//   return stays
// }


function _createStays() {
  let stays = utilService.loadFromStorage(KEY);
  if (!stays || !stays.length) {
    stays = [
      {
        "_id": "10006546",
        "name": "Ribeira Charming Duplex",
        "type": "House",
        "imgUrls": ['/src/assets/images/001.jpeg',
          '/src/assets/images/002.jpeg',
          '/src/assets/images/003.jpeg',
          '/src/assets/images/004.jpeg',
          '/src/assets/images/005.jpeg'],
        "price": 50.00,
        "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
        "capacity": 8,
        "bedrooms": 2,
        "beds": 4,
        "bathrooms": 2,
        "amenities": [
          "TV",
          "Cable TV",
          "Internet",
          "Wifi",
          "Air conditioning",
          "Wheelchair accessible",
          "Pool",
          "Kitchen",
          "Free parking on premises",
          "Doorman",
          "Gym",
          "Elevator",
          "Hot tub",
          "Heating",
          "Family/kid friendly",
          "Suitable for events",
          "Washer",
          "Dryer",
          "Smoke detector",
          "Carbon monoxide detector",
          "First aid kit",
          "Safety card",
          "Fire extinguisher",
          "Essentials",
          "Shampoo",
          "24-hour check-in",
          "Hangers",
          "Hair dryer",
          "Iron",
          "Laptop friendly workspace",
          "Self check-in",
          "Building staff",
          "Private entrance",
          "Room-darkening shades",
          "Hot water",
          "Bed linens",
          "Extra pillows and blankets",
          "Ethernet connection",
          "Luggage dropoff allowed",
          "Long term stays allowed",
          "Ground floor access",
          "Wide hallway clearance",
          "Step-free access",
          "Wide doorway",
          "Flat path to front door",
          "Well-lit path to entrance",
          "Disabled parking spot",
          "Step-free access",
          "Wide doorway",
          "Wide clearance to bed",
          "Step-free access",
          "Wide doorway",
          "Step-free access",
          "Wide entryway",
          "Waterfront",
          "Beachfront"
        ],
        "host": {
          "_id": "5139939s1",
          "fullname": "Patty And Beckett",
          "imgUrl": "/src/assets/images/profilePics/1.jpg",
          // "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        "loc": {
          "street": "Lahaina, HI, United States",
          "country": "United States",
          "location": {
            "lan": -156.6917,
            "lat": 20.93792
          },
          "countryCode": "US",
          "city": "Maui"
        },
        "reviews": [
          {
            "id": "madeId",
            "createdAt": "May 2020",
            "txt": "Super clean! Great service",
            "rate": 5,
            "by": {
              "_id": "u101",
              "fullname": "user1",
              "imgUrl": "https://robohash.org/10711825?set=set1"
            }
          },
          {
            "id": "madeId",
            "createdAt": "May 2021",
            "txt": "Very helpful hosts. Cooked traditional...",
            "rate": 4,
            "by": {
              "_id": "u102",
              "fullname": "user2",
              "imgUrl": "/src/assets/images/profilePics/1.jpg",
            }
          }
        ],
        "likedByUsers": ['mini-user'] // for user-wishlist : use $in
      },
      {
        "_id": "10006547",
        "name": "Belle chambre à côté Metro Papineau",
        "type": "Apartment",
        "imgUrls": ['/src/assets/images/006.jpeg',
          '/src/assets/images/007.jpeg',
          '/src/assets/images/008.jpeg',
          '/src/assets/images/009.jpeg',
          '/src/assets/images/010.jpeg'],
        "price": 80.00,
        "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
        "capacity": 5,
        "bedrooms": 2,
        "beds": 3,
        "bathrooms": 2,
        "amenities": [
          "TV",
          "Wifi",
          "Kitchen",
          "Elevator",
          "Buzzer/wireless intercom",
          "Heating",
          "Family/kid friendly",
          "Washer",
          "Dryer",
          "Smoke detector",
          "Carbon monoxide detector",
          "Essentials",
          "Iron",
          "translation missing: en.hosting_amenity_50"
        ],
        "host": {
          "_id": "51399392",
          "fullname": "Angel",
          "imgUrl": "/src/assets/images/profilePics/1.jpg",
        },
        "loc": {
          "street": "Montréal, QC, Canada",
          "country": "Canada",
          "location": {
            "lan": -73.54985,
            "lat": 45.52797
          },
          "countryCode": "CA",
          "city": "Montreal"
        },
        "reviews": [
          {
            "id": "madeId",
            "txt": "The place was great, as was the host! I would recommend staying here.",
            "rate": 4,
            "by": {
              "_id": "u103",
              "fullname": "Rowan",
              "imgUrl": "/src/assets/images/profilePics/1.jpg",
            }
          }
        ],
        "likedByUsers": ['mini-user'] // for user-wishlist : use $in
      },
      {
        "_id": "10006548",
        "name": "M&M Space MM2  Apartamento no centro da cidade",
        "type": "Apartment",
        "imgUrls": ['/src/assets/images/011.jpeg',
          '/src/assets/images/012.jpeg',
          '/src/assets/images/013.jpeg',
          '/src/assets/images/014.jpeg',
          '/src/assets/images/015.jpeg'],
        "price": 200.00,
        "summary": "O apartamento fica perto de arte e cultura e dos mais belos monumentos da cidade. Belos jardins e paisagens da cidade e do rio Douro ficam perto e podem ser apreciadas.  Existem restaurantes típicos e de comida internacional ao redor do apartamento.   O espaço fica numa rua típica da cidade, cheia da sua magia e magnetismo e é muito pratico e confortável. O espaço é excelente para quem pretende visitar e conhecer a zona histórica e turística do Porto. Transportes públicos ficam próximos.",
        "capacity": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1,
        "amenities": [
          "TV",
          "Cable TV",
          "Internet",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Paid parking off premises",
          "Free street parking",
          "Buzzer/wireless intercom",
          "Family/kid friendly",
          "Washer",
          "Smoke detector",
          "First aid kit",
          "Fire extinguisher",
          "Essentials",
          "Shampoo",
          "Lock on bedroom door",
          "24-hour check-in",
          "Hangers",
          "Hair dryer",
          "Iron",
          "Laptop friendly workspace",
          "Private entrance",
          "Crib",
          "Room-darkening shades",
          "Hot water",
          "Bed linens",
          "Extra pillows and blankets",
          "Microwave",
          "Coffee maker",
          "Refrigerator",
          "Dishwasher",
          "Dishes and silverware",
          "Cooking basics",
          "Oven",
          "Stove",
          "Patio or balcony",
          "Luggage dropoff allowed",
          "Long term stays allowed",
          "Wide doorway",
          "Well-lit path to entrance",
          "Step-free access",
          "Wide doorway",
          "Accessible-height bed",
          "Step-free access",
          "Wide doorway",
          "Accessible-height toilet",
          "Step-free access",
          "Wide entryway",
          "Host greets you",
          "Handheld shower head",
          "Paid parking on premises",
          "Fixed grab bars for shower"
        ],
        "host": {
          "_id": "51399391",
          "fullname": "Maria",
          "imgUrl": "/src/assets/images/profilePics/1.jpg",
        },
        "loc": {
          "street": "Porto, Porto, Portugal",
          "country": "Portugal",
          "location": {
            "lan": -8.60154,
            "lat": 41.14834
          },
          "countryCode": "PT",
          "city": "Porto"
        },
        "reviews": [
          {
            "id": "madeId",
            "txt": "Very helpful hosts. Cooked traditional...",
            "rate": 2,
            "by": {
              "_id": "u104",
              "fullname": "user3",
              "imgUrl": "/src/assets/images/profilePics/1.jpg",
            }
          },
          {
            "id": "madeId",
            "txt": "The place was great, as was the host! I would recommend staying here.",
            "rate": 5,
            "by": {
              "_id": "u103",
              "fullname": "Rowan",
              "imgUrl": "/src/assets/images/profilePics/1.jpg",
            }
          }
        ],
        "likedByUsers": ['mini-user'] // for user-wishlist : use $in
      },
      {
        "_id": "10006531",
        "name": "Fresh and modern 1BR in Bed-Stuy",
        "type": "House",
        "imgUrls": ['/src/assets/images/016.jpeg',
          '/src/assets/images/017.jpeg',
          '/src/assets/images/018.jpeg',
          '/src/assets/images/019.jpeg',
          '/src/assets/images/020.jpeg'],
        "price": 133.00,
        "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
        "capacity": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1,
        "amenities": [
          "Internet",
          "Wifi",
          "Air conditioning",
          "Kitchen",
          "Heating",
          "Family/kid friendly",
          "Smoke detector",
          "Carbon monoxide detector",
          "Fire extinguisher",
          "Essentials",
          "Shampoo",
          "24-hour check-in",
          "Hangers",
          "Hair dryer",
          "Iron",
          "Laptop friendly workspace",
          "translation missing: en.hosting_amenity_49",
          "Self check-in",
          "Lockbox"
        ],
        "host": {
          "_id": "51399391",
          "fullname": "Shaila & Alex",
          "imgUrl": "https://a0.muscache.com/im/users/6334250/profile_pic/1368287493/original.jpg?aki_policy=profile_small",
        },
        "loc": {
          "street": "Brooklyn, NY, United States",
          "country": "United States",
          "location": {
            "lan": -73.92922,
            "lat": 40.68683
          },
          "countryCode": "US",
          "city": "New York"
        },
        "reviews": [
          {
            "id": "madeId",
            "txt": "Very helpful hosts. Cooked traditional...",
            "rate": 3,
            "by": {
              "_id": "u102",
              "fullname": "user2",
              "imgUrl": "/src/assets/images/profilePics/1.jpg",
            }
          },
          {
            "id": "madeId",
            "txt": "The place was great, as was the host! I would recommend staying here.",
            "rate": 4,
            "by": {
              "_id": "u103",
              "fullname": "Rowan",
              "imgUrl": "/src/assets/images/profilePics/1.jpg",
            }
          }
        ],
        "likedByUsers": ['mini-user'] // for user-wishlist : use $in
      },
      {
        "_id": "10006588",
        "name": "Habitación centro de Barcelona",
        "type": "House",
        "imgUrls": ['/src/assets/images/021.jpeg',
          '/src/assets/images/022.jpeg',
          '/src/assets/images/023.jpeg',
          '/src/assets/images/024.jpeg',
          '/src/assets/images/025.jpeg'],
        "price": 80.00,
        "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
        "capacity": 8,
        "bedrooms": 4,
        "beds": 8,
        "bathrooms": 2,
        "amenities": [
          "Wifi",
          "Kitchen",
          "Doorman",
          "Elevator",
          "Buzzer/wireless intercom",
          "Heating",
          "Essentials",
          "Hangers",
          "Hair dryer",
          "translation missing: en.hosting_amenity_49",
          "translation missing: en.hosting_amenity_50"
        ],
        "host": {
          "_id": "51399391",
          "fullname": "Marián",
          "imgUrl": "https://a0.muscache.com/im/users/31635864/profile_pic/1429604852/original.jpg?aki_policy=profile_small",
        },
        "loc": {
          "street": "Barcelona, Catalunya, Spain",
          "country": "Spain",
          "location": {
            "lan": 2.16685,
            "lat": 41.38371
          },
          "countryCode": "ES",
          "city": "Barcelona"
        },
        "reviews": [
          {
            "id": "madeId",
            "txt": "Host: Marian gave us a warm welcome and treated us kindly from the very beginning. She offered us help, told us what to visit and even put water, milk and orange juice in the fridge! We could have breakfast at her place which was perfect because she has a little sweet balcony! \r\nLocation: calmly situated in a side street, very near to the Placa Catalunya, the Rambla and the gothic area of Barcelona (very beautiful:)) so you have the old cultural center as well as all the restaurants and bars just nearby.\r\nHouse/Room: the appartment is not a huge, but I think you have everything you need (beautiful sitting room, balcony, kitchen) in it. You have to share the appartment with Marian so pay attention and don't be too loud in the evening!!\r\ndisadvantage: the heat is terrible in summer and there is no air-condition..\r\n\r\nI would overall recommend it to everybody!! But if you want to party and stay up late, take a hostel or another appartment.",
            "rate": 4,
            "by": {
              "_id": "u177",
              "fullname": "user77",
              "imgUrl": "/src/assets/images/profilePics/1.jpg",
            }
          },
        ],
        "likedByUsers": ['mini-user'] // for user-wishlist : use $in
      },
      {
        "_id": "622f337a75c7d36e498aaafd",
        "name": "DOUBLE ROOM IN THE HEART OF BCN",
        "summary": "Lit room with balcony. The apartment is in the center, just meters from the Palau de la Musica Catalana. Well connected, a few minutes from Las Ramblas and the Born. Very close to the beach and Ciutadella Park",
        "interaction": "Te proporcionaré sábanas y toallas, para que no te preocupes de traerlas tú.",
        "houseRules": "-Mantener el espacio limpio y recogido. -No está permitido invitar a gente al apartamento. -Respetar el descanso de los vecinos. -No hacer ruido en la escalera. Apelo al sentido común de los inquilinos para una convivencia relajada y fluída. No hay normas en la casa más allá de las que dicte el sentido común.",
        "type": "Apartment",
        // "roomType": "Private room",
        // "bedType": "Real Bed",
        "cancellationPolicy": "strict_14_with_grace_period",
        "capacity": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1,
        "numOfReviews": 108,
        "amenities": [
          "Wifi",
          "Kitchen",
          "Paid parking off premises",
          "Smoking allowed",
          "Heating",
          "Washer",
          "Essentials",
          "Shampoo",
          "Lock on bedroom door",
          "Hangers",
          "Hair dryer",
          "Iron",
          "translation missing: en.hosting_amenity_49",
          "translation missing: en.hosting_amenity_50",
          "Hot water",
          "Bed linens",
          "Host greets you"
        ],
        "host": {
          "_id": "622f3404e36c59e6164fb63a",
          "fullname": "Isabel",
          "location": "Barcelona, Catalonia, Spain",
          "about": "Mi nombre es Isabel, pero me llamo Isa. Nací en Vigo (Galicia). Con 20 años me fuí a vivir a Madrid con intención de ser actriz; ahora resido en Barcelona desde los 28. Soy una joven de 43 años, cantante de Jazz. Me gusta salir, pero también quedarme en casa a leer o ver alguna buena película.\r\nHe compartido piso muchos años, pero estas serán mis primeras experiencias como anfitriona.\r\n\r\n¡Sed bienvenidos!\r\n",
          "responseTime": "within an hour",
          "thumbnailUrl": "https://a0.muscache.com/im/pictures/72a579ce-37d7-466e-9c25-9876ee8de037.jpg?aki_policy=profile_small",
          "pictureUrl": "https://a0.muscache.com/im/pictures/72a579ce-37d7-466e-9c25-9876ee8de037.jpg?aki_policy=profile_x_medium",
          "isSuperhost": false,
          "id": "35858044"
        },
        "loc": {
          "street": "Barcelona, Catalonia, Spain",
          "country": "Spain",
          "location": {
            "lan": 2.17561,
            "lat": 41.38701
          },
          "countryCode": "ES",
          "city": "Barcelona"
        },
        "price": 25,
        "securityDeposit": null,
        "cleaningFee": 25,
        "extraPeople": 20,
        "reviewScores": {
          "accuracy": 9,
          "cleanliness": 9,
          "checkin": 9,
          "communication": 10,
          "location": 10,
          "value": 9,
          "rating": 90
        },
        "reviews": [
          {
            "id": "madeId",
            "at": "2016-02-24T05:00:00.000Z",
            "rate": 4,
            "by": {
              "_id": "622f3405e36c59e6164fb95e",
              "fullname": "Pierre",
              "imgUrl": "https://robohash.org/58999873?set=set1",
            },
            "txt": "Una instancia muy céntrica en uno de estos edificios antiguos del Barri Gotic. No es poco haber conseguido estar en el centro de Barcelona en la misma semana del Mobile World Congress. Isabel es un encanto de anfitrión."
          },
          {
            "id": "madeId",
            "rate": 1,
            "at": "2016-03-24T04:00:00.000Z",
            "by": {
              "_id": "622f3403e36c59e6164fafa6",
              "fullname": "Isabelle",
              "imgUrl": "https://robohash.org/26247027?set=set1",
              "id": "26247027"
            },
            "txt": "The host canceled this reservation 2 days before arrival. This is an automated posting."
          },
          {
            "id": "madeId",
            "rate": 5,
            "at": "2016-04-07T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbaf2",
              "fullname": "Hélène",
              "imgUrl": "https://robohash.org/46103953?set=set1",
              "id": "46103953"
            },
            "txt": "Chambre très bien située et hôtesse très sympathique. Merci encore Isabel pour l'accueil !"
          },
          {
            "id": "madeId",
            "rate": 2,
            "at": "2016-04-13T04:00:00.000Z",
            "by": {
              "_id": "622f3407e36c59e6164fbdc3",
              "fullname": "Daniel",
              "imgUrl": "https://robohash.org/25801559?set=set1",
            },
            "txt": "Sheets weren't clean... Shower has very low water pressure. Room is only good for sleeping. It's in a good location but that's about it. Isabel could've provided more information about what's around the house during check in... Overall just decent enough to sleep"
          },
          {
            "id": "madeId",
            "rate": 4,
            "at": "2016-04-25T04:00:00.000Z",
            "by": {
              "_id": "622f3401e36c59e6164fabad",
              "fullname": "Maria Isabel",
              "imgUrl": "https://robohash.org/60712702?set=set1",
            },
            "txt": "Isabel est accueillante. L'appartement est charmant, correspond aux images. Très bien situé, à côté de Palau de la musica, dans un vieil immeuble plein de charme un peu désuet. Amateurs de confort et décor \"tendance\" s'abstenir. Chez Isabel on se trouve dans une authentique ambiance d'artiste. Merci beaucoup, je garderai le souvenir de cet accueil lié aux souvenirs de Barcelone."
          },
          {
            "id": "53206905",
            "rate": 4,
            "at": "2016-05-04T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb967",
              "fullname": "Aitana",
              "imgUrl": "https://robohash.org/53206905?set=set1",
            },
            "txt": "Es un piso con mucho encanto, muy tranquilo y en un lugar inmejorable. La anfitriona, Isabel, es amable y facilitadora. El piso es una construcción antigua, lo que le da un ambiente genial pero también hace que el agua de la ducha salga con poquísima presión y sea un poco incómodo a veces. A parte de esto, si tuviese que poner alguna queja sería la hora del chekout, ya que las diez de la mañana me parece un poco pronto. \r\nEn conjunto tuvimos una muy buena experiencia y repetiríamos sin duda."
          },
          {
            "id": "69740054",
            "rate": 5,
            "at": "2016-05-12T04:00:00.000Z",
            "by": {
              "_id": "622f3406e36c59e6164fbb88",
              "fullname": "Valentina",
              "imgUrl": "https://robohash.org/69740054?set=set1",
            },
            "txt": "Isabel was a wonderful host even if she was not there. She was in touch with me by mobile constantly. Thank you so much!\r\nThe house it's nice and was very clean and quite in the night.Perfect location. All you need for few days in Barcelona!"
          },
          {
            "id": "53581405",
            "rate": 5,
            "at": "2016-05-16T04:00:00.000Z",
            "by": {
              "_id": "622f3405e36c59e6164fb715",
              "fullname": "Jeremy",
              "imgUrl": "https://robohash.org/53581405?set=set1",
            },
            "txt": "Isabel's place was perfect. It was cozy, clean and quiet. She was a very gracious host and was always there to answer my questions about getting around Barcelona. "
          }
        ],
        "imgUrls": ['/src/assets/images/026.jpeg',
          '/src/assets/images/027.jpeg',
          '/src/assets/images/028.jpeg',
          '/src/assets/images/029.jpeg',
          '/src/assets/images/030.jpeg'],
        "likedByUsers": ['mini-user'] // for user-wishlist : use $in
      },

    ];
    utilService.saveToStorage(KEY, stays);
  }
  return stays;
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
