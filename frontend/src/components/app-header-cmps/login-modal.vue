<template>
  <section class="login-modal-container">
    <div class="login-modal flex col">
      <header class="login-modal-header">
        <div class="login-header">Log in or sign up</div>
      </header>

      <form
        v-if="!isSignup"
        @submit.prevent="login"
        class="login-form flex col"
      >
        <h1>Welcome to Casabnb</h1>
        <div class="form-control input-main-container">
          <div class="form-control input-container username-con flex col">
            <label for="username" class="form-label fw-600">Username</label>
            <input
              id="username"
              type="text"
              class="form-input"
              placeholder="Enter you username"
              v-model="newUser.username"
              autocomplete="off"
            />
          </div>

          <div class="form-control input-container flex col">
            <label for="password" class="form-label fw-600">Password</label>
            <input
              id="password"
              type="password"
              class="form-input"
              v-model="newUser.password"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          <span>Login</span>
        </button>
        <button @click="isSignup = !isSignup" class="my-1 btn btn-info-text">
          Don't have an account yet? Sign up now!
        </button>

        <br />
        <div class="btn-group flex col">
          <button type="submit" class="btn btn-primary">
            Connect with Facebook
          </button>

          <button type="submit" class="btn btn-primary">
            Connect with Google Account
          </button>
        </div>
      </form>

      <form
        @submit.prevent="signup"
        v-if="isSignup"
        class="signup form px-3 py-2"
      >
        <div class="text-center my-2">
          <h2 class="clr-teal">We happy to see you here!</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div class="form-control">
          <label for="fullname" class="form-label fw-600">Fullname</label>
          <input
            id="fullname"
            type="text"
            class="form-input"
            placeholder="Enter your fullname"
            v-model="newUser.fullname"
            v-focus
            autocomplete="off"
          />
        </div>
        <div class="form-control">
          <label for="username" class="form-label fw-600">Username</label>
          <input
            id="username"
            type="text"
            class="form-input"
            placeholder="Enter you username"
            v-model="newUser.username"
            autocomplete="off"
          />
        </div>
        <div class="form-control">
          <label for="password" class="form-label fw-600">Password</label>
          <input
            id="password"
            type="password"
            class="form-input"
            v-model="newUser.password"
            placeholder="Enter your password"
          />
        </div>

        <div class="btn-group">
          <button type="submit" class="btn btn-primary">Sign In</button>
        </div>

        <button @click="isSignup = !isSignup" class="my-1 btn btn-info-text">
          Already have an account? Login now!
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import { userService } from "../../services/user-service.js";
export default {
  name: "login",
  data() {
    return {
      isSignup: false,
      newUser: { fullname: "", username: "", password: "" },
      x: 0,
      y: 0,
    };
  },
  mounted() {
    window.addEventListener("click", this.onLoginCheck);
  },
  unmounted() {
    window.removeEventListener("click", this.onLoginCheck);
  },
  computed: {
    // user() {
    //   return this.$store.getters.user
    // },
  },
  methods: {
    async login() {
      await this.$store.dispatch({ type: "login", cred: this.newUser });
      // this.$emit("updateUser");
      this.$emit("closeMenu");
      this.$emit("closeModal");
    },
    async signup() {
      await this.$store.dispatch({ type: "signup", cred: this.newUser });
      // this.$emit('closeModal')
    },
    async logout() {
      // await this.$store.dispatch({ type: 'logout' })
    },
    onLoginCheck(ev) {
      const el = ev.target.className;
      console.log("onlogin check", ev);
      console.log("onlogin check el", el);
      if (el === "login-modal-container") {
        this.$emit("closeModal");
        this.$emit("closeMenu");
        return;
      }
      return;
    },
    onMousemove(e) {
      this.x = e.clientX;
      this.y = e.clientY;

      // const el = ev.target.className;

      // const rect = button.getBoundingClientRect();
      // this.x = ((e.clientX - rect.left) * 100) / button.clientWidth;
      // this.y = ((e.clientY - rect.top) * 100) / button.clientHeight;
      // button.style.setProperty("--mouse-x", x);
      // button.style.setProperty("--mouse-y", y);

      // e.target.style.setProperty("--x", `${this.x}px`);
      // e.target.style.setProperty("--y", `${this.y}px`);

      // document.querySelector(".btn").onmousemove = (e) => {
      //   const x = e.pageX - e.target.offsetLeft;
      //   const y = e.pageY - e.target.offsetTop;
      //       e.target.style.setProperty("--x", `${x}px`);
      // e.target.style.setProperty("--y", `${y}px`);
      // };
    },
  },
};
</script>
