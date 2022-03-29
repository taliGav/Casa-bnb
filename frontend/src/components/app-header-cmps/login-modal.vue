<template>
	<section class="login-modal-container">
		<div class="login-modal flex col">
			<header class="flex align just">
				<h3>Log in or sign up</h3>
			</header>

			<form @submit.prevent="login" class="login-form flex col">
				<h1>Welcome to Casabnb</h1>
				<div class="form-control input-main-container">
					<div class="form-control input-container username-con flex col">
						<label for="username">Username</label>
						<input
							id="username"
							type="text"
							class="form-input"
							placeholder="Enter you username"
							v-model="user.username"
              v-focus
							autocomplete="off"
						/>
					</div>

					<div class="form-control input-container flex col">
						<label for="password" class="form-label fw-600">Password</label>
						<input
							id="password"
							type="password"
							class="form-input"
							v-model="user.password"
							placeholder="Enter your password"
						/>
					</div>
				</div>

				<div class="buttons-container flex col space">
					<button type="submit" class="login-btn">
						<span>Login</span>
					</button>
				</div>

				<!-- <button @click="isSignup = !isSignup" class="sign-up-btn">
					Don't have an account yet? Sign up now!
				</button> -->
				<!-- <div class="social-login">
					<button type="submit" class="btn btn-primary">
						Connect with Facebook
					</button>

					<button type="submit" class="btn btn-primary">
						Connect with Google Account
					</button>
				</div> -->
			</form>
		</div>
	</section>
</template>

<script>
import reserveBtn from '../reusable-cmps/reserve-btn-cmp.vue';
// import { userService } from '../../services/user-service.js';
export default {
	name: 'login',
	data() {
		return {
			user: { username: '', password: '' },
			x: 0,
			y: 0,
		};
	},
	mounted() {
		window.addEventListener('click', this.onLoginCheck);
		// this.$refs.user.$el.focus();
	},
	unmounted() {
		window.removeEventListener('click', this.onLoginCheck);
	},
	computed: {
		// user() {
		//   return this.$store.getters.user
		// },
	},
	methods: {
		async login() {
			if (!this.user.username || !this.user.password) return;
			await this.$store.dispatch({ type: 'login', cred: this.user });
			// this.$emit("updateUser");
			this.$emit('closeMenu');
			this.$emit('closeModal');
		},
		async signup() {
			await this.$store.dispatch({ type: 'signup', cred: this.user });
			// this.$emit('closeModal')
		},
		async logout() {
			// await this.$store.dispatch({ type: 'logout' })
		},
		onLoginCheck(ev) {
			const el = ev.target.className;
			if (el === 'login-modal-container') {
				this.$emit('closeLogin');
				// this.$emit('closeMenu');
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
	components: {
		reserveBtn,
	},
};
</script>
