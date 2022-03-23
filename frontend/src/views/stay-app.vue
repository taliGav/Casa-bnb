<template>
  <section class="stay-app">
    <stay-search />
    <!-- <stay-filter @setFilter="setFilter" /> -->
    <stay-list :stays="stays" />
  </section>
</template>

<script>
import stayList from '../components/stay-list.vue'
import staySearch from '../components/stay-search.vue'
// import stayFilter from '../components/stay-filter.vue'
export default {
  name: 'stay-app',
  data() {
    return {
      
    }
  },
  created() {
    var filterBy = this.$route.query
    this.setFilter(filterBy)
    
    // this.$store.dispatch({ type: 'loadStays' })
  },
  computed: {
    stays() {
      return this.$store.getters.staysToShow
    },
  },
  methods: {
    setFilter(filterBy) {
      const copyfilter = JSON.parse(JSON.stringify(filterBy))
      this.$store.dispatch({ type: 'setFilter', filterBy: copyfilter })
    },
  },
  components: {
    stayList,
    staySearch,
    // stayFilter,
  },
}
</script>

<style></style>
