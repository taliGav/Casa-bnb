<template>
  <section class="relative">
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
    </div>
    <!-- <div class="relative"> -->
    <user-menu
      @closeMenu="closeMenu"
      :user="user"
      v-if="isMenuOpen"
      class="open-user-menu"
    ></user-menu>
    <!-- </div> -->
  </section>
</template>

<script>
import userMenu from "./user-menu-cmp.vue";

export default {
  name: "user-badge",
  data() {
    return {
      user: null,
      isMenuOpen: false,
    };
  },
  created() {
    this.user = this.$store.getters.user;
  },
  methods: {
    openUserBar() {
      this.user = this.$store.getters.user;
      console.log("badge user:", this.user);
      this.isMenuOpen = !this.isMenuOpen;
      console.log("this.isMenuOpen", this.isMenuOpen);
      // console.log("this.isGuest", this.isGuest);
    },
    // updateUser() {
    //   this.isGuest = this.$store.getters.guest;
    // },
    async logout() {
      await this.$store.dispatch({ type: "logout" });
    },
    closeMenu() {
    //   console.log('closing');
    //   this.isMenuOpen = false;
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
  },
};
</script>
