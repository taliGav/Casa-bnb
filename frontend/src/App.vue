<template>
	<section
		class="details-layout flex col space"
		:class="{ 'details-layout': !isHome, 'main-layout': isHome }"
	>
		<app-header @screenResize="screenResize" @currPath="currPage" />
		<router-view />
		<app-footer :screenSize="screenSize" />
	</section>
</template>

<script>
import appHeader from './components/app-header.vue';
import appFooter from './components/app-footer.vue';

export default {
	name: 'app',
	data() {
		return {
			screenSize: null,
			isHome: null,
		};
	},
	methods: {
		screenResize(screenSize) {
			this.screenSize = screenSize;
		},
		currPage(path) {
			console.log('app getting page ', path);
			if (path === '/') {
				this.isHome = true;
			} else {
				this.isHome = false;
			}
		},
	},
	computed: {},
	created() {},
	components: {
		appHeader,
		appFooter,
	},
};
</script>

<style></style>
