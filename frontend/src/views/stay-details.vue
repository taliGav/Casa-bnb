<template>
  <section v-if="stay" class="stay-details">
    <h2 class="uppercase">{{ stay.name }}</h2>

    <div class="rating">
      ⭐{{ avgRating }} ({{ reviewsCount }} reviews)
      <div class="needs-to-be-completed">
        host type (superhost) + google location city+country
        {{ stay.loc.city }}, {{ stay.loc.country }}
      </div>
    </div>

    <section
      class="details-img-container stay-images-container"
      v-for="(imgUrl, idx) in this.stay.imgUrls"
      :key="idx"
    >
      <img :src="imgUrl" :class="imgClass" alt="" />
      <!-- <img :src="imgUrl" :class="imgClass" alt="" • /> -->
    </section>

    <div class=" flex col space">
      <div class="host-details flex">
        <div class="host-main-details">
          <h3>{{ stay.type }} hosted by {{ stay.host.fullname }}</h3>
          <p>
            {{ stay.capacity }} guests · {{ stay.bedrooms }} bedroom ·
            {{ stay.beds }} bed · {{ stay.bathrooms }} bath
          </p>
        </div>
        <div class="host-img">
          <img :src="hostImg" alt="" srcset="" />
        </div>
      </div>

      <hr />

      <p class="preview-stay-title">{{ stay.name }}</p>
      <p class="clr-teal fw-bold">${{ stay.price }} /NIGHT</p>
    </div>

    <h2 class="clr-teal">Reviews</h2>

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

    <div v-if="reviews?.length" class="my-1 flex">
      <article
        class="review flex gap-1 items-start p-3"
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
</template>

<script>
import { stayService } from "../services/stay-service";
// import { reviewService } from "../services/review-service";

export default {
  components: {},
  name: "stay-detail",
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
    await this.$store.dispatch({
      type: "getReviews",
      filterBy: { stayId: this.stay._id },
    });

    if (user) {
      this.reviewToAdd = await reviewService.getEmptyReview();
      this.reviewToAdd.userId = user._id;
      this.reviewToAdd.stayId = this.stay._id;
    }
  },
  computed: {
    imgClass() {
      return "img-card";
    },
    hostImg() {
      var url = this.stay.host.imgUrl;
      console.log("host img url", url);
      return url;
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
.stay-details {
  padding-top: 100px;
}
</style>