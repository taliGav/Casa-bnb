<template>
  <section class="user-menu-sec">
    <div class="guest-user-menu" v-if="!user">
      <div class="guest-user-actions">
        <div @click="openLogInModal" class="sign-up-action-label action label">
          <p class="sign-up">Sign up</p>
        </div>
        <div class="log-in-action-label action label" @click="openLogInModal">
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
        <div class="notification-label action label" @click="showNotifications">
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
        <div class="host-your-home-label info label" @click="goToListings">
          <router-link to="/reservations">Manage listings</router-link>
          <!-- <p>Manage listings</p> -->
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

    <login-modal
      v-if="isModalOpen"
      @closeModal="isModalOpen = false"
      @closeMenu="closeMenu"
    />
  </section>
</template>


<script>
import loginModal from "./login-modal.vue";

export default {
  name: "user-menu",
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      isModalOpen: false,
    };
  },

  components: {
    loginModal,
  },

  created() {},

  methods: {
    // updateUser() {
    //   console.log(" this.$store.getters.user", this.$store.getters.user);
    //   if (this.$store.getters.user) this.isGuest = false;
    //   // this.$store.getters.filterBy
    // },
    openLogInModal() {
      this.isModalOpen = !this.isModalOpen;
      //   this.$emit("closeMenu");
    },
    closeMenu() {
      this.$emit("closeMenu");
    },
    async logout() {
      console.log("logout");
      await this.$store.dispatch({ type: "logout" });
      this.$emit("closeMenu");
      console.log("logout2");

      //   this.isGuest = !this.isGuest;
      //   console.log("this.isGuest", this.isGuest);
    },
    menuCheck(ev) {
      //   console.log("test", this.$el);
      //   const el = ev.target.className;
      //   if (el === "user-menu-sec") {
      //     this.$emit("closeMenu");
      //     return;
      //   }
      return;
    },
  },
  mounted() {
    window.addEventListener("click", this.menuCheck);
  },
  unmounted() {
    window.removeEventListener("click", this.menuCheck);
  },
};
</script>