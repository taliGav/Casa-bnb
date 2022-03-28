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
    <div class="guest-user-menu" v-if="isOpen">
      <div class="guest-user-commands">
        <div class="sign-up-command-label command label" @click="openLogInModal">
          <p>Sign up</p>
        </div>
        <div class="log-in-command-label  command label" @click="openLogInModal">
          <p>Log in</p>
        </div>
        <div class="log-out-command-label  command label" @click="logout">
          <p>Log out</p>
        </div>
      </div>
      <div class="host-your-home-command-label  command label" @click="goToHostRegistration">
        <p>Host your home</p>
      </div>
      <div class="help-label label" @click="goToHelp">
        <p>Help</p>
      </div>
    </div>
    <login-modal @closeModal="isModalOpen = false" v-if="isModalOpen" />
  </section>
</template>


<script>
import loginModal from "./login-modal.vue";

export default {
  name: "user-badge",
  data() {
    return {
      isOpen: false,
      isModalOpen: false,
    };
  },
  created() {},
  destroyed() {},
  methods: {
    openUserBar() {
      this.isOpen = !this.isOpen;
    },
    openLogInModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    async logout() {
      await this.$store.dispatch({ type: "logout" });
    },
  },
  computed: {},
  watch: {},
  components: {
    loginModal,
  },
};
</script>
<style>
</style>

// font for the logo // font-family: Circular, -apple-system,
BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
