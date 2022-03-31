<template>
  <section class="stay-app">
    <!-- <img v-if="isLoading" src="./../assets/img-upload-func/spin-load.gif" />
    <label v-else> -->
    <stay-filter @setFilter="setFilter" :stays="stays" :filterBy="filterBy" />
    <!-- <div class="filter-count">{{ stays.count }} in {{ filterBy.location }}</div> -->
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
      return this.$route.query;
    },
  },
  methods: {
    async setFilter() {
      // this.isLoading = true;
      await this.$store.commit({ type: "setFilter", filterBy: this.filterBy });
      // this.isLoading = false;
      this.$store.dispatch({ type: "loadStays" });
    },
      // getStays() {
      // this.stays = this.$store.getters.staysToShow;
    // },

      // getFilterBy() {
      // this.stays = this.$route.query;
    // },

  },
  components: {
    stayList,
    stayFilter,
  },
};
</script>

<style>

.filter-count{
  height:42px;
  line-height:20px;

}
</style>
