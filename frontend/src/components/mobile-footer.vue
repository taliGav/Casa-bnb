<template>
  <div class="mobile-footer flex align just">
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
      <el-badge :value="notification" class="item">
        <div
          class="mobile-footer-icon flex col align space"
          @click="openUserMenu"
        >
          <img src="../assets/Images/logos/login.svg" alt="" />
          <p>Menu</p>
        </div>
      </el-badge>
    </div>
    <mobile-menu
      :class="{ 'bottom-slide': isMobileMenu }"
      @closeMenu="closeMenu"
      :notification="notification"
      @readNotification="readNotification"
    ></mobile-menu>
    <div class="mobile-order"></div>
  </div>
</template>
<script>
import mobileMenu from './mobile-menu.vue';
import { socketService } from '../services/socket.service.js';

export default {
	name: 'mobile-footer',
	props: {
		screenSize: {
			type: Object,
		},
	},
	data() {
		return {
			isMobileMenu: false,
			loggedUser: null,
			notification: '',
		};
	},
	created() {
		this.setSocket()
		// try {
		// 	this.loggedUser = this.$store.getters.user;
		// 	console.log(this.loggedUser);
		// 	socketService.emit('topic', this.loggedUser._id);
		// 	socketService.on('add order', this.createNotification);
		// 	// console.log('');
		// } catch (err) {
		// 	console.log('got error getting a user', err);
		// }
		// console.log(this.loggedUser);
		// if (this.loggedUser) {
		// }
	},
	destroyed() {
		socketService.off('add order');
	},
	methods: {
		explore() {
			this.$router.push({ path: '/stay/' });
		},
		goHome() {
			this.$router.push({ path: '/' });
		},
		openUserMenu() {
			// console.log('opening user menu');
			this.isMobileMenu = true;
		},
		closeMenu() {
			// console.log('closing from the footer');
			this.isMobileMenu = false;
		},
		createNotification() {
			console.log('creating notification', this.notification);
			this.notification = 'New Order!';
			console.log('creating notification', this.notification);
		},
		readNotification() {
			this.notification = '';
		},
		setSocket() {
			this.loggedUser = this.getUser;
			if (!this.loggedUser) return;
			console.log(this.getUser);
			socketService.emit('topic', this.loggedUser._id);
			socketService.on('add order', this.createNotification);
			console.log('the socket has been set', this.loggedUser._id);
		},
	},
	computed: {
		screenStatus() {
			if (this.screenSize?.path === 'stay') return false;
			else return true;
		},
		getUser() {
			return this.$store.getters.user;
		},
		// mobileMenu() {
		// 	return { 'bottom-slide': this.isMobileMenu };
		// },
	},
	components: {
		mobileMenu,
	},
	watch: {
		getUser: 'setSocket',
	},
};
</script>
<style></style>
