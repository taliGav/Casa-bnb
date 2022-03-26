<template>
  <header
    class="main-header main-layout"
    ref="header"
    :class="{ visible: !isOpen }"
    :style="{ backgroundColor: searchStatus }"
  >
    <div class="header-content flex space">
      <div class="logo flex just align just">
        <h2>
          <router-link :class="{ 'color-theme': colorsChange }" to="/">
            casa<span class="casa-symbol">⌂</span
            ><span class="clr-teal">bnb</span>
          </router-link>
        </h2>
      </div>
      <small-search-bar
        :isOpen="isOpen"
        @openSearch="openSearch"
      ></small-search-bar>
      <nav class="nav-bar flex just align space">
        <div class="explore-link flex just align">
          <router-link :class="{ 'color-black': colorsChange }" to="/stay"
            >Explore</router-link
          >
        </div>
        <div class="host-link flex just align">
          <router-link :class="{ 'color-black': colorsChange }" to="/"
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
import smallSearchBar from '../components/small-search-bar.vue';

export default {
	name: 'app-header',
	data() {
		return {
			isOpen: null,
			colorsChange: null,
			isSearchClicked: false,
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
			if (window.scrollY === 0 && this.$route.path === '/') {
				this.colorsChange = false;
				this.isOpen = true;
			}
			if (window.scrollY !== 0) {
				this.colorsChange = true;
				this.isOpen = false;
				this.isSearchClicked = false;
			}
		},
		openSearch() {
			console.log('header opening search');
			this.isOpen = true;
			this.isSearchClicked = true;
		},
		checkPagePath() {
			if (this.$route.path !== '/') {
				this.isOpen = false;
				this.colorsChange = true;
			} else {
				this.isOpen = true;
				this.colorsChange = false;
				this.isSearchClicked = false;
			}
		},
	},

	computed: {
		searchStatus() {
			if (this.isSearchClicked) return 'rgba(255, 255, 255)';
		},
	},
	watch: {
		$route(to, from) {
			this.checkPagePath();
		},
	},
	components: {
		userBadge,
		staySearch,
		datePicker,
		smallSearchBar,
	},
};
</script>
