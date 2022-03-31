<template>
  <section class="main-layout flex col space">
    <app-header @screenResize = "screenResize" />
    <router-view  />
    <app-footer :screenSize = "screenSize" />
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'

export default {
  name: 'app',
  data() {
		return {
      screenSize: null
		};
	},
  methods: {
    screenResize(screenSize){
      this.screenSize = screenSize;
    }
  },
  computed:{
   
  },
  created() {
  },
  components: {
    appHeader,
    appFooter,
  },
}
</script>

<style></style>
