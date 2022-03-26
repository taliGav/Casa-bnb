<template>
  <section class="home full main-app">
    <div class="hero full main-layout"></div>
    <div class="main-layout">
      <popular-dest-list :popularDest="popularDest" />
      <popular-stays-list :popularStays="popularStays" />
    </div>
  </section>
</template>

<script>
import staySearch from "../components/stay-search.vue";
import popularStaysList from '../components/popular-stays-list.vue'
import popularDestList from '../components/popular-dest-list.vue'
export default {
  name: "home",
  data() {
    return {};
  },
  created() {
    console.log('hellooooooo');
  },
  computed: {
    popularDest(){
      return this.$store.getters.popularDest;
    },
    popularStays(){
      return this.$store.getters.popularStays;
    },
    
  },
  methods: {},
  components: {
    staySearch,
    popularStaysList,
    popularDestList,
  },
};
</script>

<style></style>
