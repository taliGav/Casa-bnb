<template>
	<section>
		<div @click="openUserBar" class="user-badge flex align just space">
			<span class="badge-hamburger">☰</span>
			<img
				class="badge-image"
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1rfdGOYPCcbada6QNqTauI3LH-SpptOXVrA&usqp=CAU"
				alt=""
			/>
		</div>
		<div class="relative">
			<user-menu
				@closeMenu="closeMenu"
				:user="user"
				v-if="isMenuOpen"
				class="open-user-menu"
			></user-menu>
		</div>
	</section>
</template>

<script>
import userMenu from './user-menu-cmp.vue';

export default {
	name: 'user-badge',
	data() {
		return {
			user: null,
			isMenuOpen: false,
		};
	},
	created() {},
	methods: {
		openUserBar() {
			this.user = this.$store.getters.user;
			console.log('badge user:', this.user);
			this.isMenuOpen = !this.isMenuOpen;
			console.log('this.isMenuOpen', this.isMenuOpen);
			// console.log("this.isGuest", this.isGuest);
		},
		// updateUser() {
		//   this.isGuest = this.$store.getters.guest;
		// },
		async logout() {
			await this.$store.dispatch({ type: 'logout' });
		},
    closeMenu(){
      // console.log('closing');
      // this.isMenuOpen = false;
    }
	},
	computed: {},
	watch: {},
	components: {
		userMenu,
	},
};
</script>
