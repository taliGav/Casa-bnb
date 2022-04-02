<template>
	<!-- <div :class="{ invisible: isVisible }"> -->
	<div class="menu-back-screen" @click.stop.prevent="closeMenu">
		<section class="user-menu-sec">
			<div class="guest-user-menu" v-if="!user">
				<div class="guest-user-actions">
					<div @click="openSignup" class="sign-up-action-label action label">
						<p class="sign-up">Sign up</p>
					</div>
					<div class="log-in-action-label action label" @click="openLogin">
						<p>Log in</p>
					</div>
				</div>
				<div class="guest-user-info">
					<div
						class="host-your-home-label info label"
						@click="goToHostRegistration"
					>
						<p>Host your home</p>
					</div>
					<div class="help-label info label" @click="goToHelp">
						<p>Help</p>
					</div>
				</div>
			</div>
			<div class="reg-user-menu" v-else>
				<div class="reg-user-info">
					<div @click="openUserMsgs" class="messages-label action label">
						<p>Messages</p>
					</div>
					<div
						class="notification-label action label"
						@click="showNotifications"
					>
						<p>Notifications</p>
					</div>
					<div class="trips-label action label" @click="goToTrips">
						<p>Trips</p>
					</div>
					<div class="wishlist-label action label" @click="goToWishlists">
						<p>Wishlists</p>
					</div>
				</div>
				<div class="reg-host-actions">
					<div
						class="host-your-home-label info label"
						@click="readNotification"
					>
						<router-link to="/user"
							>Manage listings
							<span v-if="notificationStatus">❗</span></router-link
						>
					</div>
					<div class="host-your-home-label info label" @click="goToAccount">
						<p>Account</p>
					</div>
				</div>
				<div class="reg-user-actions">
					<div class="help-label info label" @click="goToHelp">
						<p>Help</p>
					</div>
					<div class="log-out-action-label action label" @click="logout">
						<p>Log out</p>
					</div>
				</div>
			</div>
		</section>
	</div>
	<!-- </div> -->
</template>

<script>
export default {
	name: 'user-menu',
	emits: ['openLogin', 'openSignupModal', 'closeMenu'],
	props: {
		user: {
			type: Object,
		},
		notification: {
			type: String,
		},
	},
	data() {
		return {};
	},
	components: {},
	created() {},
	methods: {
		openLogin() {
			this.$emit('openLogin');
		},
		openSignup() {
			console.log('open modal');
			// this.isSignupModal = true;
			this.$emit('openSignupModal');
		},
		async logout() {
			console.log('logout');
			await this.$store.dispatch({ type: 'logout' });
			this.$emit('closeMenu');
		},
		closeMenu() {
			this.$emit('closeMenu');
		},
		readNotification() {
			this.$emit('readNotification');
		},
	},
	computed: {
		isVisible() {
			if (this.isSignupModal || this.isLoginModal) {
				return true;
			}
		},
		notificationStatus() {
			if (this.notification) return true;
			else false;
		},
	},
	mounted() {
		// window.addEventListener('click', this.menuCheck);
	},
	unmounted() {
		// window.removeEventListener('click', this.menuCheck);
	},
};
</script>
