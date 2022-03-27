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
    <div v-if="isOpen">
      <p @click="openLogInModal">Log in</p>
      <p>Sing up</p>
    </div>
    <login-modal @closeModal="isModalOpen = false" v-if="isModalOpen" />
  </section>
</template>
<script>
import loginModal from './login-modal.vue'
export default {
	name: 'user-badge',
	data() {
		return {
			isOpen: false,
			isModalOpen: false,
		};
	},
	created() {
	},
	destroyed() {
	},
	methods: {
		openUserBar() {
			this.isOpen = !this.isOpen;
		},
		openLogInModal() {
			this.isModalOpen = !this.isModalOpen;
		},
		
	},
	computed: {
	},
	watch: {
		
	},
	components: {
		loginModal
	},
};
</script>
<style>
</style>

// font for the logo // font-family: Circular, -apple-system,
BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
