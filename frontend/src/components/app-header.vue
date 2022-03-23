<template>
	<header class="main-header" ref="header">
		<div class="main-layout flex space">
			<div class="header-content flex space">
				<div class="logo flex just align">
					<h2>
						<router-link to="/">
							casa<span class="casa-symbol">⌂</span
							><span class="clr-teal">bnb</span>
						</router-link>
					</h2>
				</div>
				<stay-search />
				<nav class="nav-bar flex just align space">
					<!-- <router-link class="link" to="/">Explore</router-link> -->
					<div class="explore-link flex just align">
						<router-link to="/stay">Explore</router-link>
					</div>
					<div class="host-link flex just align">
						<router-link to="/">Become a Host</router-link>
					</div>

					<user-badge></user-badge>
				</nav>
			</div>
		</div>
	</header>
</template>
<script>
import userBadge from './user-badge.vue';
import staySearch from '../components/stay-search.vue';
export default {
	name: 'header',
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
	components: {
		userBadge,
		staySearch,
	},
};
</script>
