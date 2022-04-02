// import axios from 'axios'
import { utilService } from './util-service';
import { httpService } from './http-service';
import { storageService } from './async-storage-service';



const KEY = 'stays_db';
const amenities = [
  {
    name: "TV",
    svg: `<svg viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M9 29v-2h2v-2H6a5 5 0 0 1-4.995-4.783L1 20V8a5 5 0 0 1 4.783-4.995L6 3h20a5 5 0 0 1 4.995 4.783L31 8v12a5 5 0 0 1-4.783 4.995L26 25h-5v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-2.995 2.824L3 8v12a3 3 0 0 0 2.824 2.995L6 23h20a3 3 0 0 0 2.995-2.824L29 20V8a3 3 0 0 0-2.824-2.995z"></path></svg>`
  },

  {
    name: "Wifi",
    svg: `<svg viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="m15.9999 20.33323c2.0250459 0 3.66667 1.6416241 3.66667 3.66667s-1.6416241 3.66667-3.66667 3.66667-3.66667-1.6416241-3.66667-3.66667 1.6416241-3.66667 3.66667-3.66667zm0 2c-.9204764 0-1.66667.7461936-1.66667 1.66667s.7461936 1.66667 1.66667 1.66667 1.66667-.7461936 1.66667-1.66667-.7461936-1.66667-1.66667-1.66667zm.0001-7.33323c3.5168171 0 6.5625093 2.0171251 8.0432368 4.9575354l-1.5143264 1.5127043c-1.0142061-2.615688-3.5549814-4.4702397-6.5289104-4.4702397s-5.5147043 1.8545517-6.52891042 4.4702397l-1.51382132-1.5137072c1.48091492-2.939866 4.52631444-4.9565325 8.04273174-4.9565325zm.0001-5.3332c4.9804693 0 9.3676401 2.540213 11.9365919 6.3957185l-1.4470949 1.4473863c-2.1746764-3.5072732-6.0593053-5.8431048-10.489497-5.8431048s-8.31482064 2.3358316-10.48949703 5.8431048l-1.44709488-1.4473863c2.56895177-3.8555055 6.95612261-6.3957185 11.93659191-6.3957185zm-.0002-5.3336c6.4510616 0 12.1766693 3.10603731 15.7629187 7.9042075l-1.4304978 1.4309874c-3.2086497-4.44342277-8.4328305-7.3351949-14.3324209-7.3351949-5.8991465 0-11.12298511 2.89133703-14.33169668 7.334192l-1.43047422-1.4309849c3.58629751-4.79760153 9.31155768-7.9032071 15.7621709-7.9032071z"></path></svg>`
  },

  {name:"Air conditioning",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M17 1v4.03l4.026-2.324 1 1.732L17 7.339v6.928l6-3.464V5h2v4.648l3.49-2.014 1 1.732L26 11.381l4.026 2.325-1 1.732L24 12.535l-6 3.464 6 3.465 5.026-2.902 1 1.732L26 20.618l3.49 2.016-1 1.732L25 22.351V27h-2v-5.804l-6-3.465v6.929l5.026 2.902-1 1.732L17 26.97V31h-2v-4.031l-4.026 2.325-1-1.732L15 24.66v-6.929l-6 3.464V27H7v-4.65l-3.49 2.016-1-1.732 3.489-2.016-4.025-2.324 1-1.732 5.025 2.901 6-3.464-6-3.464-5.025 2.903-1-1.732L6 11.38 2.51 9.366l1-1.732L7 9.648V5h2v5.803l6 3.464V7.339L9.974 4.438l1-1.732L15 5.03V1z"></path></svg>`},
  
  {name:"Kitchen",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M26 1a5 5 0 0 1 5 5c0 6.389-1.592 13.187-4 14.693V31h-2V20.694c-2.364-1.478-3.942-8.062-3.998-14.349L21 6l.005-.217A5 5 0 0 1 26 1zm-9 0v18.118c2.317.557 4 3.01 4 5.882 0 3.27-2.183 6-5 6s-5-2.73-5-6c0-2.872 1.683-5.326 4-5.882V1zM2 1h1c4.47 0 6.934 6.365 6.999 18.505L10 21H3.999L4 31H2zm14 20c-1.602 0-3 1.748-3 4s1.398 4 3 4 3-1.748 3-4-1.398-4-3-4zM4 3.239V19h3.995l-.017-.964-.027-.949C7.673 9.157 6.235 4.623 4.224 3.364l-.12-.07zm19.005 2.585L23 6l.002.31c.045 4.321 1.031 9.133 1.999 11.39V3.17a3.002 3.002 0 0 0-1.996 2.654zm3.996-2.653v14.526C27.99 15.387 29 10.4 29 6a3.001 3.001 0 0 0-2-2.829z"></path></svg>`},

  {name:"Refrigerator",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M25 1a2 2 0 0 1 1.995 1.85L27 3v26a2 2 0 0 1-1.85 1.995L25 31H7a2 2 0 0 1-1.995-1.85L5 29V3a2 2 0 0 1 1.85-1.995L7 1zm0 10H7v18h18zm-15 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM25 3H7v6h18zM10 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>`},

  {name:"Microwave",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M29 3a2 2 0 0 1 1.995 1.85L31 5v22a2 2 0 0 1-1.85 1.995L29 29H3a2 2 0 0 1-1.995-1.85L1 27V5a2 2 0 0 1 1.85-1.995L3 3zm0 2H3v22h26zm-6 2v18H5V7zm-2 2H7v14l3 .001a4.975 4.975 0 0 1-.992-2.721L9 20v-3h10v3a4.978 4.978 0 0 1-1 3.001L21 23zm-4 10h-6v1a3 3 0 0 0 2.65 2.98l.174.015L14 23a3 3 0 0 0 2.995-2.824L17 20zm9-8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>`},

  {name:"Dishes and silverware",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M29 1v2c-7.18 0-13 5.82-13 13 0 7.077 5.655 12.833 12.693 12.996L29 29v2c-8.284 0-15-6.716-15-15 0-8.18 6.547-14.83 14.686-14.997zM3 1h2v6h2V1h2v6h2V1h2v9a5.002 5.002 0 0 1-3.999 4.9L9 31H7V14.9a5.01 5.01 0 0 1-3.978-4.444l-.017-.232L3 10zm26 6v2a7 7 0 0 0-.24 13.996L29 23v2a9 9 0 0 1-.265-17.996zM10.999 9h-6v.975l.005.176a3 3 0 0 0 5.99.025L11 10z"></path></svg>`},

  {name:"Heating",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M16 0a5 5 0 0 1 4.995 4.783L21 5l.001 12.756.26.217a7.984 7.984 0 0 1 2.717 5.43l.017.304L24 24a8 8 0 1 1-13.251-6.036l.25-.209L11 5A5 5 0 0 1 15.563.019l.22-.014zm0 2a3 3 0 0 0-2.995 2.824L13 5v13.777l-.428.298a6 6 0 1 0 7.062.15l-.205-.15-.428-.298L19 11h-4V9h4V7h-4V5h4a3 3 0 0 0-3-3zm1 11v7.126A4.002 4.002 0 0 1 16 28a4 4 0 0 1-1-7.874V13zm-1 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path></svg>`},
  
  {name:"Essentials",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M11 1v7l1.898 20.819.007.174c-.025 1.069-.804 1.907-1.818 1.999a2 2 0 0 1-.181.008h-7.81l-.174-.008C1.86 30.87 1.096 30.018 1.096 29l.002-.09 1.907-21L3.001 1zm6 0l.15.005a2 2 0 0 1 1.844 1.838L19 3v7.123l-2 8V31h-2V18.123l.007-.163.02-.162.033-.16L16.719 11H13V1zm11 0a2 2 0 0 1 1.995 1.85L30 3v26a2 2 0 0 1-1.85 1.995L28 31h-7v-2h7v-2h-7v-2h7v-2h-7v-2h7v-2h-7v-2h7v-2h-7v-2h7v-2h-7V9h7V7h-7V5h7V3h-7V1zM9.088 9h-4.18L3.096 29l.058.002L10.906 29l-.004-.058zM17 3h-2v6h2zM9.002 3H5L5 7h4.004z"></path></svg>`},

  {name:"Hangers",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M16 2a5 5 0 0 1 1.661 9.717 1.002 1.002 0 0 0-.653.816l-.008.126v.813l13.23 9.052a3 3 0 0 1 1.299 2.279l.006.197a3 3 0 0 1-3 3H3.465a3 3 0 0 1-1.694-5.476L15 13.472v-.813c0-1.211.724-2.285 1.816-2.757l.176-.07a3 3 0 1 0-3.987-3.008L13 7h-2a5 5 0 0 1 5-5zm0 13.211L2.9 24.175A1 1 0 0 0 3.465 26h25.07a1 1 0 0 0 .565-1.825z"></path></svg>`},

  {name:"Hair dryer",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M14 27l-.005.2a4 4 0 0 1-3.789 3.795L10 31H4v-2h6l.15-.005a2 2 0 0 0 1.844-1.838L12 27zM10 1c.536 0 1.067.047 1.58.138l.38.077 17.448 3.64a2 2 0 0 1 1.585 1.792l.007.166v6.374a2 2 0 0 1-1.431 1.917l-.16.04-13.554 2.826 1.767 6.506a2 2 0 0 1-1.753 2.516l-.177.008H11.76a2 2 0 0 1-1.879-1.315l-.048-.15-1.88-6.769A9 9 0 0 1 10 1zm5.692 24l-1.799-6.621-1.806.378a8.998 8.998 0 0 1-1.663.233l-.331.008L11.76 25zM10 3a7 7 0 1 0 1.32 13.875l.331-.07L29 13.187V6.813L11.538 3.169A7.027 7.027 0 0 0 10 3zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path></svg>`},

  {name:"Self check-in",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="m16.8438 27.1562-.00005-3.39845-.2608465.0913211c-.9857292.3215073-2.0303948.5116467-3.1127817.5499306l-.4076218.0071983-.2927873-.0037049c-6.03236807-.1528291-10.89442655-5.0148222-11.04725775-11.0472069l-.00370495-.2927882.00370495-.2927873c.1528312-6.03236807 5.01488968-10.89442655 11.04725775-11.04725775l.2927873-.00370495.2927882.00370495c6.0323847.1528312 10.8943778 5.01488968 11.0472069 11.04725775l.0037049.2927873-.00663.3912275c-.0484899 1.4286741-.3615343 2.7917824-.8920452 4.0406989l-.1327748.2963236 7.90645 7.90705v5.5834h-5.5834l-4.12505-4.12545zm-6.5313-19.93745c1.708641 0 3.09375 1.38511367 3.09375 3.09375 0 1.7086436-1.3851064 3.09375-3.09375 3.09375-1.70863633 0-3.09375-1.385109-3.09375-3.09375 0-1.70863365 1.38511635-3.09375 3.09375-3.09375zm0 2.0625c-.56954635 0-1.03125.46170365-1.03125 1.03125 0 .5695521.46169942 1.03125 1.03125 1.03125.5695564 0 1.03125-.4616936 1.03125-1.03125 0-.56955058-.4616979-1.03125-1.03125-1.03125zm12.1147 15.81255 4.12455 4.12495h2.667v-2.667l-8.37295-8.37255.3697-.6775.1603998-.3074798c.56763-1.1397167.90791-2.4128858.9606815-3.761954l.0072187-.3697662-.0038197-.2688703c-.1397418-4.91222958-4.0963692-8.86881961-9.0086094-9.00856l-.2688709-.0038197-.2688703.0038197c-4.91222958.13974039-8.86881961 4.09633042-9.00856 9.00856l-.0038197.2688703.0038197.2688709c.14228112 5.0015536 4.24146819 9.0124291 9.2774303 9.0124291 1.4456308 0 2.8116781-.3298367 4.0293209-.9177001l.3012791-.1522999 1.5131-.7998-.00045 4.61975z"></path></svg>`},

  {name:"Hot water",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M16 32c6.627 0 12-5.373 12-12 0-6.218-3.671-12.51-10.924-18.889L16 .18l-1.076.932C7.671 7.491 4 13.782 4 20c0 6.577 5.397 12 12 12zm0-2c-5.496 0-10-4.525-10-10 0-5.327 3.115-10.882 9.424-16.65l.407-.37.169-.149.576.518c6.043 5.526 9.156 10.855 9.407 15.977l.013.34L26 20c0 5.523-4.477 10-10 10zm-3.452-5.092a8.954 8.954 0 0 1 2.127-4.932l.232-.26.445-.462a6.973 6.973 0 0 0 1.827-4.416l.007-.306-.006-.307-.007-.11a6.03 6.03 0 0 0-2.009-.057 4.979 4.979 0 0 1-1.443 4.008 10.951 10.951 0 0 0-2.87 5.016 6.034 6.034 0 0 0 1.697 1.826zM16 26l.253-.005.25-.016-.003-.137c0-1.32.512-2.582 1.464-3.533a10.981 10.981 0 0 0 3.017-5.656 6.026 6.026 0 0 0-1.803-1.743 8.971 8.971 0 0 1-2.172 5.493l-.228.255-.444.462a6.96 6.96 0 0 0-1.827 4.415l-.006.276c.48.123.982.189 1.499.189z"></path></svg>`},

  {name:"Lockbox",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M25 2a5 5 0 0 1 4.995 4.783L30 7v18a5 5 0 0 1-4.783 4.995L25 30H7a5 5 0 0 1-4.995-4.783L2 25V7a5 5 0 0 1 4.783-4.995L7 2zm0 2H7a3 3 0 0 0-2.995 2.824L4 7v4l2-.001V6h20v20H6v-5.001L4 21v4a3 3 0 0 0 2.824 2.995L7 28h18a3 3 0 0 0 2.995-2.824L28 25V7a3 3 0 0 0-2.824-2.995zm-1 4H8v16h16zm-8 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-10-.001L4 13v6l2-.001z"></path></svg>`},

  {name:"Bathtub",
  svg:`<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path d="M7.5 2a4.5 4.5 0 0 1 4.473 4H14v2H8V6h1.95a2.5 2.5 0 0 0-4.945.336L5 6.5V16h26v2h-2v5a5.001 5.001 0 0 1-3 4.584V30h-2v-2H8v2H6v-2.416a5.002 5.002 0 0 1-2.995-4.349L3 23v-5H1v-2h2V6.5A4.5 4.5 0 0 1 7.5 2zm19.499 16h-22L5 23a3 3 0 0 0 2.65 2.98l.174.015L8 26h16a3 3 0 0 0 2.995-2.824L27 23z"></path></svg>`},

  // {name:"Kitchen",
  // svg:``},

  // {name:"Kitchen",
  // svg:``},

  // {name:"Kitchen",
  // svg:``},

  // "Internet",
  // "Wheelchair accessible",
  // "Pool",
  // "Free parking on premises",
  // "Gym",
  // "Elevator",
  // "Hot tub",
  // "Washer",
  // "Smoke detector",
  // "Waterfront",
  // "Beachfront"
];

const lessAmenities = [
  "Free cancellation",
  "Wifi",
  "Kitchen",
  "Air conditioning",
  "Washer",
];

const PopularDest = [
  {
    name: "Tel Aviv",
    imgUrl: "https://static.timesofisrael.com/www/uploads/2012/06/F100801MS97-1024x640.jpg"
  },
  {
    name: "Montreal",
    imgUrl: "https://www.tripsavvy.com/thmb/j322QK4_BTfNYj7D8LHCtjMCHl0=/735x0/montreal-observatory-au-sommet-pvm-place-ville-marie-naibank-getty-576db2935f9b585875a7a1f6-3f29e92afb7545b1a422e75564c6b8b3.jpg"
  },
  {
    name: "Porto",
    imgUrl: "https://travelfoot.com/wp-content/uploads/2020/10/airbnb-in-porto.jpg"
  },
  {
    name: "New York",
    imgUrl: "https://travelfoot.com/wp-content/uploads/2020/09/airbnb-new-york.jpg"
  },
];

const PopularStays = [
  {
    "_id": "624179570927e9ee1531afba",
    name: "Ribeira Charming Duplex",
    "country": "United States",
    imgUrl: "https://res.cloudinary.com/cajan-22/image/upload/v1648561314/casaBnb/015_mgdifp.jpg"
  },
  {
    "_id": "624179570927e9ee1531afbb",
    name: "Belle chambre",
    "country": "Canada",
    imgUrl: "https://res.cloudinary.com/cajan-22/image/upload/v1648561309/casaBnb/007_ippncu.jpg"
  },
  {
    "_id": "624179570927e9ee1531afbc",
    name: "Apartamento no centro",
    "country": "Portugal",
    imgUrl: "https://res.cloudinary.com/cajan-22/image/upload/v1648561305/casaBnb/002_vsafjd.jpg"
  },
  {
    "_id": "624179570927e9ee1531afbd",
    name: "Modern 1BR in Bed-Stuy",
    "country": "United States",
    imgUrl: "https://res.cloudinary.com/cajan-22/image/upload/v1648561317/casaBnb/019_ccohaq.jpg"
  },
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
  getPopularDest,
  getPopularStays,
};

// _createStays();

function getPopularDest() {
  return PopularDest;
}
function getPopularStays() {
  return PopularStays;
}

function getAmenities() {
  return amenities;
}
function getLessAmenities() {
  return lessAmenities;
}

async function query(filterBy = {}) {
  return await httpService.get(`${ENDPOINT}`, filterBy);
  try {
    var stays = await storageService.query(KEY);
    if (filterBy.destination) {
      const regex = new RegExp(filterBy.destination, 'i');
      stays = stays.filter((stay) => regex.test(stay.loc.country) || regex.test(stay.loc.city));
    }
    if (filterBy.guests) {
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
        return amenitiesToFilter.every((amenity) => {
          return stay.amenities.includes(amenity);
        });
      });
    }
    if (filterBy.maxPrice && filterBy.minPrice) {
      console.log('serv price', filterBy.minPrice, filterBy.maxPrice);
      stays = stays.filter((stay) => (stay.price >= filterBy.minPrice) && (stay.price <= filterBy.maxPrice));
    }
    return stays;
  }
  finally {
    // console.log('f stays:', stays);
  }

  // console.log('stay service filter: ', filterBy);

}

async function getById(id) {
  return await httpService.get(`${ENDPOINT}/${id}`);
  // return axios.get(BASE_URL + id).then((res) => res.data)
  // return storageService.getById(KEY, id);
}

async function remove(id) {
  return await httpService.delete(`${ENDPOINT}/${id}`);
  // return axios.delete(BASE_URL + id).then((res) => res.data)
  // return storageService.remove(KEY, id);
}

async function save(stay) {
  return stay._id
    ? await httpService.put(`${ENDPOINT}/${stay._id}`, stay)
    : await httpService.post(ENDPOINT, stay);
  // return stay._id ? storageService.put(KEY, stay) : storageService.post(KEY, stay);
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
        "likedByUsers": ['mini-user']
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
          "_id": "51399391",
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
            "createdAt": "May 2020",
            "txt": "The place was great, as was the host! I would recommend staying here.",
            "rate": 4,
            "by": {
              "_id": "u103",
              "fullname": "Rowan",
              "imgUrl": "/src/assets/images/profilePics/1.jpg",
            }
          }
        ],
        "likedByUsers": ['mini-user']
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
          "_id": "51399392",
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
            "createdAt": "April 2021",
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
            "createdAt": "July 2020",
            "txt": "The place was great, as was the host! I would recommend staying here.",
            "rate": 5,
            "by": {
              "_id": "u103",
              "fullname": "Rowan",
              "imgUrl": "/src/assets/images/profilePics/1.jpg",
            }
          }
        ],
        "likedByUsers": ['mini-user']
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
        "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
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
          "_id": "51399393",
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
            "createdAt": "January 2022",

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
            "createdAt": "June 2020",
            "txt": "The place was great, as was the host! I would recommend staying here.",
            "rate": 4,
            "by": {
              "_id": "u103",
              "fullname": "Rowan",
              "imgUrl": "/src/assets/images/profilePics/1.jpg",
            }
          }
        ],
        "likedByUsers": ['mini-user']
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
          "_id": "51399394",
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
        "likedByUsers": ['mini-user']
      },
      {
        "_id": "622f337a75c7d36e498aaafd",
        "name": "DOUBLE ROOM IN THE HEART OF BCN",
        "summary": "Lit room with balcony. The apartment is in the center, just meters from the Palau de la Musica Catalana. Well connected, a few minutes from Las Ramblas and the Born. Very close to the beach and Ciutadella Park",
        "interaction": "Te proporcionaré sábanas y toallas, para que no te preocupes de traerlas tú.",
        "houseRules": "-Mantener el espacio limpio y recogido. -No está permitido invitar a gente al apartamento. -Respetar el descanso de los vecinos. -No hacer ruido en la escalera. Apelo al sentido común de los inquilinos para una convivencia relajada y fluída. No hay normas en la casa más allá de las que dicte el sentido común.",
        "type": "Apartment",
        "capacity": 2,
        "bedrooms": 1,
        "beds": 1,
        "bathrooms": 1,
        "amenities": [
          "Wifi",
          "Kitchen",
          "Paid parking off premises",
          "Smoking allowed",
          "Heating",
          "Washer",
          "Bed linens",
          "Host greets you"
        ],
        "host": {
          "_id": "51399395",
          "fullname": "Isabel",
          "imgUrl": "https://a0.muscache.com/im/users/31635864/profile_pic/1429604852/original.jpg?aki_policy=profile_small",
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
            "createdAt": "January 2022",
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
            "createdAt": "November 2021",
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
            "createdAt": "November 2021",
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
            "createdAt": "August 2021",
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
            "createdAt": "June 2021",
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
            "createdAt": "April 2021",
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
            "createdAt": "August 2020",
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
            "createdAt": "May 2020",
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
        "likedByUsers": ['mini-user']
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
