<template>
	<section class="relative" @click="openUserBar">
		<div @click="openUserBar" class="user-badge flex align just space">
			<span class="badge-hamburger">☰</span>
			<svg
				v-if="!user"
				class="host-img"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="presentation"
				focusable="false"
				style="display: block; height: 80%; width: 80%; fill: currentcolor"
			>
				<path
					d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"
				></path>
			</svg>

			<img v-else class="badge-image" :src="userImg" alt="" />
			<!-- src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1rfdGOYPCcbada6QNqTauI3LH-SpptOXVrA&usqp=CAU" -->
		</div>
		<!-- <div class="relative"> -->
		<user-menu
			@openSignupModal="openSignup"
			:user="user"
			v-if="isMenuOpen"
			@closeMenu="closeMenu"
			@openLogin="openLogin"
			class="open-user-menu"
		></user-menu>
		<login-modal
			v-if="isLoginModal"
			@closeLogin="closeLogin"
			@closeMenu="closeMenu"
		/>
		<Signupmodal
			v-if="isSignupModal"
			@closeSignup="closeSignup"
			@closeMenu="closeMenu"
		/>
		<!-- </div> -->
	</section>
</template>

<script>
import userMenu from './user-menu-cmp.vue';
import Signupmodal from './signup-modal.vue';
import loginModal from './login-modal.vue';

export default {
	name: 'user-badge',
	data() {
		return {
			user: null,
			isMenuOpen: false,
			isLoginModal: false,
			isSignupModal: false,
		};
	},
	created() {
		this.user = this.$store.getters.user;
	},
	methods: {
		openUserBar() {
      console.log('opening');
			this.user = this.$store.getters.user;
			this.isMenuOpen = true;
		},
		// updateUser() {
		//   this.isGuest = this.$store.getters.guest;
		// },
		async logout() {
			await this.$store.dispatch({ type: 'logout' });
		},
		closeMenu() {
      console.log('closing');
			this.isMenuOpen = false;
		},
		openLogin() {
			this.isLoginModal = true;
			this.isMenuOpen = false;
      
		},
		openSignup() {
			this.isSignupModal = true;
      this.isMenuOpen = false;
		},
		closeSignup() {
			this.isSignupModal = false;
		},
		closeLogin() {	
			this.isLoginModal = false;
		},
	},
	computed: {
		userImg() {
			return this.user.imgUrl;
		},
	},
	watch: {},
	components: {
		userMenu,
		Signupmodal,
		loginModal,
	},
};
</script>
