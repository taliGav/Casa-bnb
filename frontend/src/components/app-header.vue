<template>
	<!-- <div> -->
	<header
		class="main-header"
		ref="header"
		:class="{
			visible: !isOpen,
			'details-layout': isDetailsPage,
			'main-layout': !isDetailsPage,
		}"
		:style="{ backgroundColor: searchStatus }"
	>
		<div class="header-content flex space">
			<div class="logo flex align">
				<h2>
					<router-link :class="{ 'color-theme': colorsChange }" to="/">
						<span class="logo-txt">casa</span>
						<span class="casa-symbol">⌂</span><span class="logo-txt">bnb</span>
					</router-link>
				</h2>
			</div>
			<small-search-bar
				:isOpen="isOpen"
				@openSearch="openSearch"
			></small-search-bar>
			<mobile-search-bar @click="mobileMenu"></mobile-search-bar>
			<mobile-search-menu
				@closeMobileMenu = "mobileMenu"
				:class="{ 'bottom-slide': isMobileSearch }"
			></mobile-search-menu>
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
				<!-- <router-link></router-link> -->
				<user-badge></user-badge>
			</nav>
		</div>
		<stay-search v-if="isOpen"></stay-search>
	</header>
	<!-- </div> -->
</template>
<script>
import userBadge from './app-header-cmps/user-badge.vue';
import staySearch from '../components/stay-search.vue';
import datePicker from '../components/date-picker.vue';
import smallSearchBar from '../components/small-search-bar.vue';
import mobileSearchBar from './app-header-cmps/mobile-search-bar.vue';
import mobileSearchMenu from './app-header-cmps/mobiel-search-menu.vue';

export default {
	name: 'app-header',
	data() {
		return {
			isOpen: null,
			colorsChange: null,
			isSearchClicked: false,
			isDetailsPage: false,
			isMobileSearch: false,
		};
	},
	created() {
		window.addEventListener('scroll', this.handleScroll);

		// window.addEventListener("scroll", this.handleScroll);
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
			this.isDetailsPage = false;
			this.isSearchClicked = true;
		},
		checkPagePath() {
			const stayPath = this.$route.path.substring(1, 5);
			console.log(stayPath);
			if (this.$route.path !== '/') {
				this.isOpen = false;
				this.colorsChange = true;
			} else if (stayPath === 'stay') {
				this.isDetailsPage = true;
			} else {
				this.isOpen = true;
				this.colorsChange = false;
				this.isSearchClicked = false;
				this.isDetailsPage = false;
			}
		},
		mobileMenu() {
			console.log('openin search menu');
			this.isMobileSearch = !this.isMobileSearch;
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
		mobileSearchBar,
		mobileSearchMenu,
	},
};
</script>
