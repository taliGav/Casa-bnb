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

    <user-menu
      @closeMenu="isMenuOpen = false"
      :isGuest="isGuest"
      v-if="isMenuOpen"
      class="open-user-menu"
    ></user-menu>
  </section>
</template>


<script>
import userMenu from "./user-menu-cmp.vue";

export default {
  name: "user-badge",
  data() {
    return {
      isGuest: true,
      isMenuOpen: false,
    };
  },
  created() {},
  destroyed() {},
  methods: {
    openUserBar() {
      this.isGuest = this.$store.getters.guest;
      this.isMenuOpen = !this.isMenuOpen;
      console.log("this.isMenuOpen", this.isMenuOpen);
      console.log("this.isGuest", this.isGuest);
    },
    updateUser() {
      this.isGuest = this.$store.getters.guest;
    },
    async logout() {
      await this.$store.dispatch({ type: "logout" });
    },
  },
  computed: {},
  watch: {},
  components: {
    userMenu,
  },
};
</script>