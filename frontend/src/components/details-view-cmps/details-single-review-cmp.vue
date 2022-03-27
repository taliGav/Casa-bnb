<template>
  <section class="single-review-section">
    <div class="stay-images-container">
      <preview-carousel :urls="this.stay.imgUrls" />
    </div>
    <div class="preview-data">


      <div class="reviewer-dets flex">
        <img :src="review.by.imgUrl" alt="" />
        <div class="reviewer-name">
          <h4>{{ review.by.fullname }}</h4>
          <p>{{ review.createdAt }}</p>
        </div>
      </div>
      <p class="fw-600">{{ review.txt }}</p>
    </div>
  </section>
</template>

<script>
export default {
  components: {
  },
  name: "single-review",
  props: {
    stay: Object,
  },
  data() {
    return {};
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
    imgUrls() {
      return this.stay.imgUrls;
    },
  },
};
</script>
