<template>
  <header
    class="main-header main-layout"
    ref="header"
    :class="{ visible: !isOpen }"
  >
    <div class="header-content flex space">
      <div class="logo flex just align just">
        <h2>
          <router-link :class="{ 'color-theme': !isOpen }" to="/">
            casa<span class="casa-symbol">⌂</span
            ><span class="clr-teal">bnb</span>
          </router-link>
        </h2>
      </div>
      <nav class="nav-bar flex just align space">
        <div class="explore-link flex just align">
          <router-link :class="{ 'color-black': !isOpen }" to="/stay"
            >Explore</router-link
          >
        </div>
        <div class="host-link flex just align">
          <router-link :class="{ 'color-black': !isOpen }" to="/"
            >Become a Host</router-link
          >
        </div>
        <user-badge></user-badge>
      </nav>
    </div>
    <stay-search v-if="isOpen"></stay-search>
  </header>
</template>
<script>
import userBadge from './user-badge.vue';
import staySearch from '../components/stay-search.vue';
import datePicker from '../components/date-picker.vue';

export default {
	name: 'app-header',
	data() {
		return {
			// headerObserver: null,
			// stickyNav: false,
			isOpen: true,
		};
	},
	created() {
		window.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll);
	},
	methods: {
		handleScroll() {
			// console.log('scroll: ', window.scrollY);
			if (window.scrollY === 0) {
				this.isOpen = true;
				console.log('open search bar');
			}
			if (window.scrollY !== 0) {
				this.isOpen = false;
				console.log('close search bar');
			}
		},
		// onHeaderObserved(entries) {
		// 	entries.forEach((entry) => {
		// 		this.stickyNav = entry.isIntersecting ? false : true;
		// 	});
		// },
		// v-bind:style="{ height: stickyNav ? '80px' : '160px' }"
	},
	// mounted() {
	// 	this.headerObserver = new IntersectionObserver(this.onHeaderObserved, {
	// 		rootMargin: '-80px 0px 0px',
	// 	});
	// 	this.headerObserver.observe(this.$refs.header);
	// },
	computed: {},
	components: {
		userBadge,
		staySearch,
		datePicker,
	},
};
</script>
