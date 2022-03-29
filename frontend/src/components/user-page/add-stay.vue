<template>
  <div class="reservations-container main-app top-pad">
    <form @submit.prevent="signup" class="signup flex col just align">
      <div class="">
        <h2 class="clr-teal">create stay!</h2>
      </div>
      <div class="input-main-container">
        <div class="input-container flex col">
          <label for="Stay-name">Stay name</label>
          <input
            id="Stay-name"
            type="text"
            class="form-input"
            placeholder="Enter name"
            autocomplete="off"
          />
        </div>
        <div style="margin-top: 20px">
          <el-radio-group v-model="stay.name" size="small">
            <el-radio-button label="House" />
            <el-radio-button label="Apartment" />
            <el-radio-button label="Hotel room" />
          </el-radio-group>
        </div>
        <div class="input-container flex col">
          <label for="Price">Price</label>
          <input
            id="Price"
            type="number"
            class="form-input"
            placeholder="Enter price per night"
            autocomplete="off"
          />
        </div>
        <div class="input-container flex col">
          <label for="summary">Summary</label>
          <textarea
            id="summary"
            class="form-input"
            placeholder="Enter price per night"
            autocomplete="off"
          />
        </div>
        <div class="input-container flex col">
          <label for="capacity">Capacity</label>
          <input
            id="capacity"
            type="number"
            class="form-input"
            placeholder="Enter the capacity"
            autocomplete="off"
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
</template>

<script>
export default {
	name: 'add-stay',
	data() {
		return {
			user: null,
			stay:{
				name:'',
			},
		};
	},
	async created() {
		this.user = this.loggedUser;


	},
	methods: {

	},
	computed: {
		loggedUser() {
			return this.$store.getters.user;
		},

	},
	components: {
	},
};
</script>
<style></style>
