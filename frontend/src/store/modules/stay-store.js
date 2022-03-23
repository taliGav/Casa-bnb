import { stayService } from '@/services/stay-service.js'

export default {
  state: {
    stays: [],
    filterBy: { destination: '', dates: '', guests: 0, amenities: [], },
    amenities: stayService.getAmenities(),
    lessAmenities: stayService.getLessAmenities(),
  },
  getters: {
    stays({ stays }) {
      return stays
    },
    staysToShow({ stays, filterBy }) {
      const copyStays = JSON.parse(JSON.stringify(stays))
      return copyStays
    },
    amenities({ amenities }) {
      return amenities
    },
    lessAmenities({ lessAmenities }) {
      return lessAmenities
    },
  },
  mutations: {
    setStays(state, { stays }) {
      state.stays = stays
    },
    saveStay(state, { stay }) {
      const idx = state.stays.findIndex((t) => t._id === stay._id)
      if (idx !== -1) state.stays.splice(idx, 1, stay)
      else state.stays.push(stay)
    },
    removeStay(state, { stayId }) {
      const idx = state.stays.findIndex((t) => t._id === stayId)
      state.stays.splice(idx, 1)
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
    setSort(state, { sortBy }) {
      state.sortBy = sortBy
    },
  },
  actions: {
    loadStays({ commit, state }) {
      console.log('store filter', state.filterBy);
      stayService.query(state.filterBy).then((stays) => {
        console.log('store', stays);
        commit({ type: 'setStays', stays })
      })
    },
    saveStay({ commit }, { stay }) {
      stayService.save(stay).then((savedStay) => {
        commit({ type: 'saveStay', stay: savedStay })
      })
    },
    removeStay({ commit }, { stayId }) {
      stayService.remove(stayId).then(() => {
        commit({ type: 'removeStay', stayId })
      })
    },
    setFilter({ dispatch, commit }, { filterBy }) {
      // console.log('store', filterBy);
      commit({ type: 'setFilter', filterBy })
      dispatch({ type: 'loadStays' })
    },
  },
}
