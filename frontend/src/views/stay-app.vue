<template>
  <section class="stay-app">
    <stay-filter @setFilter="setFilter" />
    <stay-list :stays="stays" />
  </section>
</template>

<script>
import stayList from '../components/stay-list.vue'
// import staySearch from '../components/stay-search.vue'
import stayFilter from '../components/stay-filter.vue'
export default {
  name: 'stay-app',
  data() {
    return {
      
    }
  },
  created() {
    // var filterBy = this.filterBy
    this.setFilter()
    
    // this.$store.dispatch({ type: 'loadStays' })
  },
  watch: {
        '$route': 'setFilter'
    },
  computed: {
    stays() {
      return this.$store.getters.staysToShow
    },
    
    filterBy(){
      return this.$route.query
    }
  },
  methods: {
    setFilter() {
      console.log('app set filter:',this.filterBy);
      const copyfilter = JSON.parse(JSON.stringify(this.filterBy))
      this.$store.dispatch({ type: 'setFilter', filterBy: copyfilter })
    },
  },
  components: {
    stayList,
    // staySearch,
    stayFilter,
  },
}
</script>

<style></style>
