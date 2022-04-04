<template>
	<section v-if="stay" class=" stay-details">
		<details-header :stay="stay" />
		<details-gallery :stay="stay" />

		<el-carousel class="details-carousel-item" :interval="5000" arrow="always">
			<el-carousel-item v-for="item in stay.imgUrls" :key="item">
				<!-- <h3>{{ item }}</h3> -->
				<img class="details-carousel-img" :src="item" alt="" />
			</el-carousel-item>
		</el-carousel>

		<div class="details-grid">
			<div class="details-main-container full flex">
				<div class="main-inner-container">
					<details-host-main :stay="stay" />
				</div>
			</div>
			<div class="checkout-container">
				<details-checkout :stay="stay" />
			</div>

			<div class="amenities-container">
				<div class="amenities-header flex">
					<h2>What this place offers</h2>
				</div>
				<div class="amenities-content">
					<!-- <ul class="clean-list flex"> -->
					<div
						class="amenity flex align"
						v-for="(amenity, idx) in amenitiesForDisplay"
						:key="idx"
					>
						<img
							class="amenity-icon"
							:src="`./assets/amenities/${amenity.replace(/\s/g, '')}.svg`"
							@error="replaceByDefault"
						/>
						<p>{{ amenity }}</p>
					</div>
					<!-- </ul> -->
				</div>
			</div>
		</div>
		<details-reviews v-if="stay" :stay="stay" />

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
			stayAmenities: null,
			user: null,
		};
	},
	async created() {
		const { id } = this.$route.params;
		console.log('stay-details', this.$route.params);
		this.stay = await this.$store.dispatch({ type: 'getStayById', stayId: id });
		this.user = this.$store.getters.user;
		this.stayAmenities = this.stay.amenities.slice(0, 10);
		console.log(this.stayAmenities);

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
			return this.$store.getters.user;
		},
		amenitiesForDisplay() {
			//   console.log("amenitiesForDisplay", this.stay.amenities.slice(0, 10));
			return this.stay.amenities.slice(0, 10);
		},
	},
	methods: {
		// openChat(topic) {
		// 	console.log('open chat, topic:', topic);
		// 	this.topic = topic;
		// 	this.isChatOpen = true;
		// },
		replaceByDefault(e) {
			e.target.src = `./src/assets/icons/amenities/other.svg`;
		},
	},
};
</script>

<style>
/* .details-carousel-img {
	width: 100%;
	border-radius: 12px;
}

.details-carousel-item {
	border-radius: 12px;
}
.el-carousel__container {
	border-radius: 12px;
} */
</style>
