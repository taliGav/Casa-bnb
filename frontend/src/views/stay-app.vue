<template>
  <section class="stay-app">
    <!-- <stay-filter @setFilter="setFilter" /> -->
    <stay-list :stays="stays" />
  </section>
</template>

<script>
import stayList from '../components/stay-list.vue'
// import stayFilter from '../components/stay-filter.vue'
export default {
  name: 'stay-app',
  created() {
    this.$store.dispatch({ type: 'loadStays' })
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
    // stayFilter,
  },
}
</script>

<style></style>
