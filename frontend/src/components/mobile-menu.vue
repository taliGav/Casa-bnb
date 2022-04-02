<template>
	<div class="mobile-menu flex align just">
		<div class="mobile-menu-container flex align just col">
			<p>Host your home</p>
			<p>Help</p>
			<p>Messages</p>
			<p>Notifications</p>
			<p>Trips</p>
			<p>Wishlists</p>
			<p @click="moveToListings">
				Manage listings
				<span class="notification-red" v-if="orderStatus">❗</span>
			</p>
			<!-- <p>Manage listings</p> -->
			<p>Account</p>
			<p>Help</p>
			<p>Log out</p>
			<p @click="closeMenu">Back</p>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		notification: {
			type: String,
		},
	},
	data() {
		return {
			
		};
	},

	methods: {
		moveToListings() {
            this.$emit('readNotification')
			this.$router.push({ path: '/user' });
			this.closeMenu();
		},
		closeMenu() {
			console.log('closing');
			this.$emit('closeMenu');
		},
	},
	computed: {
		orderStatus() {
			if (this.notification) return true;
			else return false;
		},
	},
};
</script>

<style>
.notification-red {
	color: red;
}
</style>
