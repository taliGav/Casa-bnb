import { stayService } from '@/services/stay-service.js'

export default {
  state: {
    stays: [],
    filterBy: { name: '', inStock: '', labels: [], sortBy: '' },
    labels: stayService.getlabels(),
  },
  getters: {
    stays({ stays }) {
      return stays
    },
    staysToShow({ stays, filterBy }) {
      const copyStays = JSON.parse(JSON.stringify(stays))
      return copyStays
    },
    labels({ labels }) {
      return labels
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
      stayService.query(state.filterBy).then((stays) => {
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
      commit({ type: 'setFilter', filterBy })
      dispatch({ type: 'loadStays' })
    },
  },
}
