<template>
	<div class="mobile-footer flex align just even">
		<div class="mobile-icons-container flex space">
			<div class="mobile-footer-icon flex col align space" @click="explore">
				<img src="../assets/Images/logos/search-icon-red.svg" alt="" />
				<!-- <router-link></router-link> -->
				<p>Explore</p>
			</div>
			<div class="mobile-footer-home-icon flex col align space" @click="goHome">
				<span class="footer-home-icon">⌂</span>
				<p>Home</p>
			</div>
			<div class="mobile-footer-icon flex col align space">
				<img src="../assets/Images/logos/login.svg" alt="" />
				<p>Log in</p>
			</div>
		</div>

	</div>
</template>
<script>

export default {
	name: 'mobile-footer',

	methods: {
		explore() {
			// console.log('exploring');
			this.$router.push({ path: '/stay/' });
		},
		goHome(){
			this.$router.push({path: '/'})
		}
	},
};
</script>
<style></style>
