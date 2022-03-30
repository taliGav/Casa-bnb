<template>
  <section v-if="stay" class="details-layout stay-details">
    <details-header :stay="stay" />
    <details-gallery :stay="stay" />
    <div class="details-grid">
      <div class="details-main-container full flex">
        <div class="main-inner-container">
          <details-host-main :stay="stay" />
        </div>
      </div>
      <div class="checkout-container">
        <details-checkout :stay="stay" />
      </div>
      <!-- <hr /> -->
      <div class="amenities-container">
        <div class="amenities-header flex">
          <h2>What this place offers</h2>
        </div>

        <div class="amenities-content">
          <div
            v-for="amenitie in amenities"
            :key="amenitie"
            class="amenitie flex"
          >
            <div class="amenitie-icon"></div>
            <div class="amenitie-info flex align">
              <p>{{ amenitie }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <details-reviews :stay="stay" />

    <!-- <pre>{{ stay.amenities }}</pre> -->
    <details-map :stay="stay" />

    <!-- <div v-if="user?.isAdmin" class="btn-group gap-1">
      <button
        @click="$router.push(`/stay/edit/${stay._id}`)"
        class="btn btn-primary"
      >
        edit stay
      </button>
      <button @click="$router.push('/stay')" class="btn btn-secondary">
        go back
      </button> -->
    <!-- <button @click="removeStay" class="btn btn-danger">delete stay</button> -->
    <!-- </div> -->
  </section>

  <!-- <p class="clr-teal fw-bold">${{ stay.price }} /NIGHT</p> -->
</template>

<script>
import detailsHeader from './../components/details-view-cmps/details-header-cmp.vue';
import detailsGallery from './../components/details-view-cmps/details-gallery-cmp.vue';
import detailsHostMain from './../components/details-view-cmps/details-host-main-cmp.vue';
import detailsCheckout from './../components/details-view-cmps/details-checkout-cmp.vue';
import detailsReviews from './../components/details-view-cmps/details-reviews-cmp.vue';
import detailsMap from './../components/details-view-cmps/details-map-cmp.vue';
import { stayService } from './../services/stay-service.js';


export default {
	components: {
		detailsHeader,
		detailsGallery,
		detailsHostMain,
		detailsCheckout,
		detailsReviews,
		detailsMap,
	},

	name: 'stay-details',
	data() {
		return {
			stay: null,
			reviewToAdd: null,
			amenities: null,
		};
	},
	async created() {
		const { id } = this.$route.params;
		console.log('stay-details',this.$route.params);
		this.stay = await this.$store.dispatch({ type: 'getStayById', stayId: id });
		const user = this.$store.getters.user;
		this.amenities = this.amenitiesForDispaly;
		console.log(this.amenities);

		// review-store
		// await this.$store.dispatch({
		//   type: "getReviews",
		//   filterBy: { stayId: this.stay._id },
		// });

		// if (user) {
		//   this.reviewToAdd = await reviewService.getEmptyReview();
		//   this.reviewToAdd.userId = user._id;
		//   this.reviewToAdd.stayId = this.stay._id;
		// }
	},
	computed: {
		user() {
			// return this.$store.getters.user;
		},
		amenitiesForDispaly() {
			return this.stay.amenities.slice(0, 10);
		},
	},
	methods: {
		// removeStay() {
		//   this.$store.dispatch({ type: 'removeStay', stayId: this.stay._id }).then(() => {
		//     this.$router.push('/stay')
		//   })
		// },
	},
};
</script>

<style></style>
