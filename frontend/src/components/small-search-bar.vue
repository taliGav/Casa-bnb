<template>
	<div
		v-if="!isOpen"
		@click="openSearch"
		class="small-search-bar flex align space"
	>
		<div class="small-search-text"><p>Start your search</p></div>
		<div class="small-search-btn flex align just">
			<img src="../assets/Images/logos/search-icon.svg" alt="" />
		</div>
	</div>
</template>
<script>
export default {
	name: 'small-search-bar',
	props: {
		isOpen: {
			type: Boolean,
		},
	},
	methods: {
		openSearch() {
			console.log('opening search');
			this.$emit('openSearch');
		},
	},
};
</script>
<style></style>
