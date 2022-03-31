<template>
  <section class="single-review-section">
    <div class="preview-data">
      <div class="reviewer-dets flex">
        <img :src="review.by.imgUrl" alt="" />
        <div class="reviewer-name">
          <h4>{{ review.by.fullname }}</h4>
          <p>{{ reviewDate }}</p>
        </div>
      </div>
      <p class="fw-600">{{ review.txt }}</p>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  name: "single-review",
  props: {
    stay: Object,
    review: Object,
    // reviews: Array,
  },
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  computed: {
    avgRating() {
      let ratingSum = this.stay.reviews.reduce((acc, x) => acc + x.rate, 0);
      let avgRating = ratingSum / this.stay.reviews.length;
      return avgRating;
    },
    reviewDate() {
      let month = new Date(this.review.createdAt).getMonth();
      const year = new Date(this.review.createdAt).getFullYear();
      month = this.months[month] + ' ';

      let date = month + year.toString();
      return date;
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
