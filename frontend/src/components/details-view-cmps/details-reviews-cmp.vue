<template>
	<section v-if="stay" class="details-reviews-section">
		<ratings-reviews class="rating-reviews-section" :stay="stay" />

		<!-- <form v-if="reviewToAdd && user" @submit.prevent="addReview" class="form">
      <div class="form-control my-1">
        <label for="txt" class="form-label fw-600">Your review</label>
        <textarea
          name="txt"
          id="txt"
          rows="3"
          class="form-input"
          v-model="reviewToAdd.content"
          required
        ></textarea>
        <div class="form-control my-1">
          <label for="rate" class="form-label">Rate</label>
          <input
            id="rate"
            type="number"
            class="form-input"
            min="0"
            max="5"
            v-model.number="reviewToAdd.rate"
          />
        </div>
      </div>
      <button class="btn btn-info">Add Review</button>
    </form> -->

		<div v-if="noReviews" class="p-2 flex flex-col gap-1">
			<h4>No reviews yet.</h4>
			<p>Be the first...</p>
		</div>
		<div v-else class="reviews-list flex">
			    <details-single-review
				class="review flex col"
				v-for="review in this.reviews.slice(0,6)" :key="review.id"
				:stay="stay" :review="review" />
				<!-- <button
          v-if="user?.isAdmin"
          class="btn btn-danger"
          @click="removeReview(review._id)"
        >
          Delete review
        </button> -->
		</div>
	</section>
</template>

<script>
import ratingsReviews from "./../reusable-cmps/ratings-reviews-cmp.vue";
import detailsSingleReview from "./details-single-review-cmp.vue";

export default {
  name: "stay-details-reviews",
  props: {
    stay: Object,
  },
  data() {
    return {
      reviews: this.reviewsToShow(),
      noReviews: this.checkReviews(),
    };
  },
  components: {
    ratingsReviews,
    detailsSingleReview,
  },
  async created() {},
  computed: {},
  methods: {
    async updateReviews() {
      this.reviews = this.stay.reviews;
    },

    reviewsToShow() {
      return this.stay.reviews;
    },
    checkReviews() {
      if (!this.stay.reviews.length || this.stay.reviews.length === 0)
        return true;
      else return false;
    },

    //       async addReview() {
    //   if (!this.reviewToAdd.content) return;
    //   await this.$store.dispatch({
    //     type: "addReview",
    //     review: this.reviewToAdd,
    //   });
    //   await this.$store.dispatch({
    //     type: "getReviews",
    //     filterBy: { stayId: this.stay._id },
    //   });
    // },
    // async removeReview(reviewId) {
    //   await this.$store.dispatch({ type: "removeReview", reviewId });
    //   await this.$store.dispatch({
    //     type: "getReviews",
    //     filterBy: { stayId: this.stay._id },
    //   });
    // },
  },
};
</script>
