<template>
  <section class="main-layout home full main-app">
    <!-- <img v-if="isLoading" src="./../assets/img-upload-func/spin-load.gif" />
    <label v-else class="hero full" > -->
    <div class="hero full">
      <div class="hero-phrase">
        <h2 class="phrase-top">Mi casa su casa</h2>
        <!-- <h2 class = "phrase-bot">es su casa</h2> -->
      </div>
    </div>
    <div>
      <popular-dest-list :popularDest="popularDest" />
      <popular-stays-list :popularStays="popularStays" />
    </div>
	<div class="home-bottom-image">
		<div class="home-bottom-phrase ">
			<h2 class = "phrase-bot">Become a host!</h2>
		</div>
		<div class="become-a-host-btn flex align just">
			<p>Learn more</p>
		</div>
	</div>
    <!-- </label> -->
  </section>
</template>

<script>
import staySearch from '../components/stay-search.vue';
import popularStaysList from '../components/homepage/popular-stays-list.vue';
import popularDestList from '../components/homepage/popular-dest-list.vue';
import { userService } from '../services/user-service.js';

export default {
	name: 'home',
	data() {
		return {
			isLoading: false,
		};
	},
	created() {
		console.log('hellooooooo');
	},
	computed: {
		popularDest() {
			return this.$store.getters.popularDest;
		},
		popularStays() {
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
