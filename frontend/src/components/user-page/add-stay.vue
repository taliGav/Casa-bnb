<template xmlns:v-gmaps-searchbox="http://www.w3.org/1999/xhtml">
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
        <div style="display: inline-block">
          <p style="margin: 10px">Amenities</p>
          <el-select-v2
            v-model="stay.amenities"
            :options="amenities"
            placeholder="Please select"
            style="width: 240px"
            multiple
            collapse-tags
          />
        </div>
        <img-upload @save="saveImg" />
        <section>
          <img
            v-for="imgUrl in stay.imgUrls"
            :key="imgUrl"
            :src="imgUrl"
            alt=""
          />
        </section>
        <GMapAutocomplete
          placeholder="This is a placeholder"
          @place_changed="setPlace"
        >
        </GMapAutocomplete>
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
import imgUpload from './../../components/host/img-upload.vue'
export default {
	name: 'add-stay',
	data() {
		return {
			amenities : [
				{value:"Free cancellation",label:"Free cancellation"},
				{value:"Wifi",label:"Wifi"},
				{value:"Kitchen",label:"Kitchen"},
				{value:"Air conditioning",label:"Air conditioning"},
				{value:"Washer",label:"Washer"},
					],
			user: null,
			stay:{
				name:'',
				amenities:[],
				imgUrls: [],
			},
			vm: {
                    searchPlace: '',
                    location: {}

                },
		};
	},
	async created() {
		this.user = this.loggedUser;


	},
	methods: {
		saveImg(imgUrl) {
        this.stay.imgUrls.push(imgUrl);
        console.log('imgUrls', this.stay.imgUrls);
      },
	  setPlace(event) {
		  var lat = event.geometry.location.lat()
		  var lng = event.geometry.location.lng()
		  console.log('mapsss:',lat);
		  console.log('mapsss:',lng);
		  console.log('mapsss:',event);
    }
	},
	computed: {
		loggedUser() {
			return this.$store.getters.user;
		},

	},
	components: {
		imgUpload
	},
};
</script>
<style></style>
