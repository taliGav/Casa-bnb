<template>
  <section v-if="stay" class="stay-details">
    <details-header :stay="stay" />
    <details-gallery :stay="stay" />
    <div class="main-container flex">
      <div class="main-inner-container">
        <details-host-main :stay="stay" />
      </div>
      <div class="checkout-container">
        <details-checkout :stay="stay" />
      </div>
    </div>
    <hr />

    <section class="reviews-section">
      <h2>⭐ {{ avgRating }} · ({{ reviewsCount }} reviews)</h2>

      <form v-if="reviewToAdd && user" @submit.prevent="addReview" class="form">
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
      </form>

      <div v-if="reviews?.length" class="flex col">
        <article
          class="review flex col items-start"
          v-for="review in reviews"
          :key="review.id"
        >
          <div class="reviewer-dets flex">
            <img :src="review.by.imgUrl" alt="" />
            <div class="reviewer-name">
              <h4>{{ review.by.fullname }}</h4>
              <p>{{ review.createdAt }}</p>
            </div>
          </div>
          <p class="fw-600">{{ review.txt }}</p>
          <!-- <button
          v-if="user?.isAdmin"
          class="btn btn-danger"
          @click="removeReview(review._id)"
        >
          Delete review
        </button> -->
        </article>
      </div>
      <div class="p-2 flex flex-col gap-1" v-else>
        <h4>No reviews yet.</h4>
        <p>Be the first...</p>
      </div>
    </section>

          <details-map :stay="stay" />
          
    <div v-if="user?.isAdmin" class="btn-group gap-1">
      <button
        @click="$router.push(`/stay/edit/${stay._id}`)"
        class="btn btn-primary"
      >
        edit stay
      </button>
      <!-- <button @click="removeStay" class="btn btn-danger">delete stay</button> -->
      <button @click="$router.push('/stay')" class="btn btn-secondary">
        go back
      </button>


    </div>
  </section>

  <!-- <p class="clr-teal fw-bold">${{ stay.price }} /NIGHT</p> -->
</template>





<script>
import detailsHeader from "./../components/details-view-cmps/details-header-cmp.vue";
import detailsGallery from "./../components/details-view-cmps/details-gallery-cmp.vue";
import detailsHostMain from "./../components/details-view-cmps/details-host-main-cmp.vue";
import detailsCheckout from "./../components/details-view-cmps/details-checkout-cmp.vue";
import detailsMap from "./../components/details-view-cmps/details-map-cmp.vue";
import { stayService } from "./../services/stay-service.js";

export default {
  components: {
    detailsHeader,
    detailsGallery,
    detailsHostMain,
    detailsCheckout,
    detailsMap
  },

  name: "stay-details",
  data() {
    return {
      stay: null,
      reviewToAdd: null,
    };
  },
  async created() {
    const { id } = this.$route.params;
    this.stay = await stayService.getById(id);
    const user = this.$store.getters.user;

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
    avgRating() {
      let ratingSum = this.stay.reviews.reduce((acc, x) => acc + x.rate, 0);
      let avgRating = ratingSum / this.stay.reviews.length;
      return avgRating;
    },
    reviewsCount() {
      return this.stay.reviews.length;
    },
    user() {
      // return this.$store.getters.user;
    },
    reviews() {
      return this.stay.reviews;
    },
  },
  methods: {
    // removeStay() {
    //   this.$store.dispatch({ type: 'removeStay', stayId: this.stay._id }).then(() => {
    //     this.$router.push('/stay')
    //   })
    // },
    async addReview() {
      if (!this.reviewToAdd.content) return;
      await this.$store.dispatch({
        type: "addReview",
        review: this.reviewToAdd,
      });
      await this.$store.dispatch({
        type: "getReviews",
        filterBy: { stayId: this.stay._id },
      });
    },
    async removeReview(reviewId) {
      await this.$store.dispatch({ type: "removeReview", reviewId });
      await this.$store.dispatch({
        type: "getReviews",
        filterBy: { stayId: this.stay._id },
      });
    },
  },
};
</script>


<style>

.main-container{
    align-items: stretch !important;
    justify-content: flex-start !important;
    flex-wrap: wrap !important;
    width: 100% !important;
    margin-left: auto !important;
    margin-right: auto !important;
}

/* .reserve-btn {
  background-color: #ff385c;
  border: none;
  color: #fff;
  text-align: center;
  letter-spacing: 0.05rem;
  width: 100%;
  height: 48px;
  min-width: 200px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  transition: opacity 1.25s ease 0s !important;
}

.reserve-btn-pointer {
  border: 0;
  min-height: 4rem;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  color: #fff;
  font-weight: 700;
  font-size: 1.25rem;
  background-image: radial-gradient(
    circle at center,
    #ff385c 0,
    #e61e4d 27.5%,
    #e31c5f 40%,
    #d70466 57.5%,
    #bd1e59 75%,
    #bd1e59 100%
  );
  transition: opacity 1.25s ease 0s !important;
  min-width: 200px;
  background-size: 200% 200%;
  background-position: calc((100 - var(--mouse-x, 0)) * 1%)
    calc((100 - var(--mouse-y, 0)) * 1%);
} */
</style>