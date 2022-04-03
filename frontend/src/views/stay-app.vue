<template>
  <section class="stay-app">
    <!-- <img v-if="isLoading" src="./../assets/img-upload-func/spin-load.gif" />
    <label v-else> -->
    <stay-filter @setFilter="setFilter" :stays="stays" />
    <stay-list :stays="stays" />
    <!-- </label> -->
  </section>
</template>

<script>
import stayList from "../components/stay-app-list-cmps/stay-list.vue";
import stayFilter from "../components/stay-filter.vue";
export default {
  name: "stay-app",
  data() {
    return {
      isLoading: false,
      // stays:null,
      // filterBy:null
    };
  },
  created() {
    this.setFilter();
  },
  watch: {
    $route: "setFilter",
  },
  computed: {
    stays() {
      return this.$store.getters.staysToShow;
    },

    filterBy() {
      var filter = this.$route.query
      //when there is only 1 amenity
      if(typeof(filter.amenities)==="string"){
        filter.amenities = filter.amenities.split(' ')
      }
      return filter;
    },
  },
  methods: {
    async setFilter() {
      await this.$store.commit({ type: "setFilter", filterBy: this.filterBy });
      this.$store.dispatch({ type: "loadStays" });
    },
  },
  components: {
    stayList,
    stayFilter,
  },
};
</script>

<style>
.filter-count {
  height: 42px;
  line-height: 20px;
}
</style>
