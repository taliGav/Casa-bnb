import { stayService } from '@/services/stay-service.js';

export default {
  state: {
    stays: [],
    filterBy: {
      destination: '',
      guests: '',
      amenities: [],
      priceRange: null,
    },
    amenities: stayService.getAmenities(),
    lessAmenities: stayService.getLessAmenities(),
  },

  getters: {
    filterBy({ filterBy }) {
      // if (!filterBy) return
      var filterToSend = JSON.parse(JSON.stringify(filterBy))
      return filterToSend;
    },
    stays({ stays }) {
      return stays;
    },
    staysToShow({ stays }) {
      const copyStays = JSON.parse(JSON.stringify(stays));
      return copyStays;
    },
    amenities({ amenities }) {
      return amenities;
    },
    lessAmenities({ lessAmenities }) {
      var lessAmenities1 = JSON.parse(JSON.stringify(lessAmenities))
      return lessAmenities1;
    },
  },

  mutations: {
    setStays(state, { stays }) {
      state.stays = stays;
    },
    saveStay(state, { stay }) {
      const idx = state.stays.findIndex((t) => t._id === stay._id);
      if (idx !== -1) state.stays.splice(idx, 1, stay);
      else state.stays.push(stay);
    },
    removeStay(state, { stayId }) {
      const idx = state.stays.findIndex((t) => t._id === stayId);
      state.stays.splice(idx, 1);
    },
    setFilter(state, { destination, guests, amenities, priceRange }) {
      state.filterBy.destination = destination ? destination : '';
      state.filterBy.guests = guests ? guests : 0;
      state.filterBy.amenities = amenities ? amenities : [];
      state.filterBy.priceRange = priceRange ? priceRange : null;
    },
    setSort(state, { sortBy }) {
      state.sortBy = sortBy;
    },
  },

  actions: {
    loadStays({ commit, state }) {
      console.log('store filter', state.filterBy);
      stayService.query(state.filterBy).then((stays) => {
        console.log('store', stays);
        commit({ type: 'setStays', stays });
      });
    },
    saveStay({ commit }, { stay }) {
      stayService.save(stay).then((savedStay) => {
        commit({ type: 'saveStay', stay: savedStay });
      });
    },
    removeStay({ commit }, { stayId }) {
      stayService.remove(stayId).then(() => {
        commit({ type: 'removeStay', stayId });
      });
    },
    setFilter({ dispatch, commit, state }, { destination, guests, amenities, priceRange }) {
      // console.log('store', destination, guests);
      commit({ type: 'setFilter', destination, guests, amenities, priceRange });
      dispatch({ type: 'loadStays' })
      return Promise.resolve(state.filterBy)

      // dispatch({ type: 'loadStays' });
    },
  },
};
