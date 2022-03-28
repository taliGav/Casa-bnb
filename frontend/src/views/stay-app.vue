<template>
  <section class="stay-app">
    <stay-filter @setFilter="setFilter" :stays="stays" />
    <stay-list :stays="stays" />
  </section>
</template>

<script>
import stayList from '../components/stay-app-list-cmps/stay-list.vue'
import stayFilter from '../components/stay-filter.vue'
export default {
  name: 'stay-app',
  data() {
    return {
      
    }
  },
  created() {
    this.setFilter()
    
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
    async setFilter() {
      await this.$store.commit({ type: 'setFilter', filterBy:this.filterBy });
      this.$store.dispatch({ type: 'loadStays' })
    },
  },
  components: {
    stayList,
    stayFilter,
  },
}
</script>

<style></style>
