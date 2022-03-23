<template>
  <header class="main-header full" ref="header">
    <div class="main-layout flex space">
      <div class="header-content flex space">
        <div class="logo flex just align">
          <h2 class="uppercase">Casa<span class="clr-teal">BNB</span></h2>
        </div>
        <stay-search />
        <nav class="nav-bar flex just align even">
          <!-- <router-link class="link" to="/">Explore</router-link> -->
          <router-link class="link" to="/stay">Explore</router-link>
          <user-badge></user-badge>
        </nav>
        <!-- <router-link class="link" to="/dashboard">Dashboard</router-link>
            <router-link class="link" to="/about">About</router-link>
            <router-link class="link" to="/login">Login</router-link>
            <router-link class="link" to="/user">User</router-link>
            <router-link class="link" to="/review">Reviews</router-link> -->
      </div>
    </div>
  </header>
</template>
<script>

import userBadge from "./user-badge.vue";
import staySearch from '../components/stay-search.vue'
export default {
	name:'header',
	data() {
		return {
			// headerObserver: null,
			// stickyNav: false,
		};
	},
	methods: {
		// onHeaderObserved(entries) {
		// 	entries.forEach((entry) => {
		// 		this.stickyNav = entry.isIntersecting ? false : true;
		// 	});
		// },
		// v-bind:style="{ height: stickyNav ? '80px' : '160px' }"
	},
	mounted() {
		// this.headerObserver = new IntersectionObserver(this.onHeaderObserved, {
		// 	root: '-80px 0px 0px',
		// });
		// this.headerObserver.observe(this.$refs.header);
	},
	computed: {},
	components:{
		userBadge,
		staySearch
	}
};
</script>
