<template>
  <section class="login-modal-container">
    <div class="login-modal">
      <form
        v-if="!isSignup"
        @submit.prevent="login"
        class="login form px-3 py-2"
      >
        <div class="text-center my-2">
          <h2 class="clr-teal">Login</h2>
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
          <button type="submit" class="btn btn-primary">Login</button>
        </div>

        <button @click="isSignup = !isSignup" class="my-1 btn btn-info-text">
          Sign up now!
        </button>
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
import {userService} from '../services/user-service.js'
export default {
  name: 'login',
  data() {
    return {
      isSignup: false,
      newUser: { fullname: '', username: '', password: '' },
    }
  },
  mounted() {
		window.addEventListener('click', this.clickCheck);
	},
	unmounted() {
		window.removeEventListener('click', this.clickCheck);
	},
  computed: {
    // user() {
    //   return this.$store.getters.user
    // },
  },
  methods: {
    async login() {
      // userService.login(this.newUser)
      await this.$store.dispatch({ type: 'login', cred: this.newUser })
      this.$emit('closeModal')
    },
    async signup() {
      // await this.$store.dispatch({ type: 'signup', cred: this.newUser })
      // this.$emit('closeModal')
    },
    async logout() {
      // await this.$store.dispatch({ type: 'logout' })
    },
    clickCheck(ev) {
			const el = ev.target.className;
			if (el === 'login-modal-container' ){
        this.$emit('closeModal')
				return;
      }
			return;
		},
  },
}
</script>
