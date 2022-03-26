<template>
  <section class="stay-app">
    <stay-filter @setFilter="setFilter" :stays="stays" />
    <stay-list :stays="stays" />
  </section>
</template>

<script>
import stayList from '../components/stay-list.vue'
import stayFilter from '../components/stay-filter.vue'
export default {
  name: 'stay-app',
  data() {
    return {
      
    }
  },
  created() {
    this.setFilter()
    this.$store.dispatch({ type: 'loadStays' })
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
    async setFilter() {
      await this.$store.dispatch({ type: 'setFilter', destination: this.filterBy.destination, guests:this.filterBy.guests,amenities:this.filterBy.amenities,priceRange:this.filterBy.priceRange })
      // console.log('app set filter:',this.filterBy);
      // const copyfilter = JSON.parse(JSON.stringify(this.filterBy))
      // this.$store.dispatch({ type: 'setFilter', filterBy: copyfilter })
    },
  },
  components: {
    stayList,
    stayFilter,
  },
}
</script>

<style></style>
