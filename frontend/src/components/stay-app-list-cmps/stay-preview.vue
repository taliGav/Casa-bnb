<template>
  <section class="stay-preview">
    <!-- <section class="stay-preview flex col space"> -->
    <div class="stay-images-container">
      <preview-carousel :urls="this.stay.imgUrls" />
    </div>
    <div class="preview-data">
      <ratings-reviews :stay="stay" />

      <div class="rating">
        <span class="span-main-prev-rating flex align">
          <img src="./../../assets/icons/star.png" class="rate-icon" />
          {{ avgRating }}
          <span class="reviews-count">&nbsp;({{ reviewsCount }})</span>
        </span>
      </div>

      <div class="stay-loc">
        <p>{{ stay.type }} in {{ stay.loc.city }}, {{ stay.loc.country }}</p>
      </div>

      <p class="preview-stay-title">{{ stay.name }}</p>
      <p>
        <span class="stay-price">${{ stay.price }}</span>
        <span class="per-night"> / &nbsp;night </span>
      </p>
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style="
          display: block;
          fill: transparent;
          height: 24px;
          width: 24px;
          stroke: var(--f-k-smk-x);
          stroke-width: 2;
          overflow: visible;
        "
      >
        <path
          d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"
        ></path>
      </svg>
    </div>
  </section>
</template>

<script>
import PreviewCarousel from "./preview-carousel.vue";
// import ratingsReviews from "./reusable-cmps/ratings-reviews-cmp.vue";

export default {
  components: {
    // ratingsReviews,
    PreviewCarousel,
  },
  name: "stay-preview",
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
      if (Number.isInteger(avgRating)) return avgRating;
      return parseFloat(avgRating).toPrecision(2);
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
