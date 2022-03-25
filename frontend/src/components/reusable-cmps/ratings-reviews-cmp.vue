<template>
  <section class="stay-rating-container">
    <div class="rating flex">
      <div class="ratings">
        <img src="./../../assets/icons/star.png" class="rate-icon" />
        <span class="rate-span"> {{ avgRating }} </span> ·
      </div>
      <u>{{ reviewsCount }} reviews</u>
    </div>
  </section>
</template>

<script>
export default {
  name: "stay-ratings-reviews",
  props: {
    stay: Object,
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
  },
};
</script>