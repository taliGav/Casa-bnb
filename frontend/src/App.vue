<template>
  <section class="main-layout  flex col space">
    <app-header />
    <router-view  />
    <app-footer />
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'

export default {
  name: 'app',
  data() {
		return {
			// filterBy: { destination: '', dates: '0', guests: 0, amenities: [] },
			// value1: 0,
		};
	},
  created() {
    // console.log('Apppp created query:', this.$route);
    // this.filterBy = this.$route.query;
    // this.$store.dispatch({ type: 'loadStays' })
  },
  components: {
    appHeader,
    appFooter,
  },
}
</script>

<style></style>
