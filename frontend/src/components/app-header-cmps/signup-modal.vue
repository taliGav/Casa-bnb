
<template>
	<div class="login-modal-container">
		<div class="signup-modal">
			<form @submit.prevent="signup" class="signup flex col just align">
				<div class="">
					<h2 class="clr-teal">We are happy to see you here!</h2>
				</div>
				<div class="input-main-container">
					<div class="input-container flex col">
						<label for="fullname">Fullname</label>
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
					<div class="input-container flex col">
						<label for="username">Username</label>
						<input
							id="username"
							type="text"
							class="form-input"
							placeholder="Enter you username"
							v-model="newUser.username"
							autocomplete="off"
						/>
					</div>
					<div class="input-container flex col">
						<label for="password">Password</label>
						<input
							id="password"
							type="password"
							class="form-input"
							v-model="newUser.password"
							placeholder="Enter your password"
						/>
					</div>
				</div>
				<div class="buttons-container flex col space">
					<button type="submit" class="btn btn-primary" @click="signUp">
						Sign Up
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
export default {
	name: 'singup-modal',

	data() {
		return {
			newUser: { fullname: '', username: '', password: '' },
		};
	},
	created() {
		window.addEventListener('click', this.closeModal);
	},
	unmounted() {
		window.removeEventListener('click', this.closeModal);
	},
	methods: {
		async signUp() {
            console.log('signing up');
			if (
				!this.newUser.username ||
				!this.newUser.password ||
				!this.newUser.fullname
			)
				return;
			await this.$store.dispatch({ type: 'signup', cred: this.newUser });
			this.$emit('closeSignup');
		},
		closeModal(ev) {
            const el = ev.target.className;
            if(el === 'login-modal-container'){
                this.$emit('closeSignup');
            }
		},
	},
	computed: {},
};
</script>

<style></style>
