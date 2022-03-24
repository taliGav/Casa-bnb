<template>
  <section v-if="stay" class="stay-details-header">
    <h1 class="details-header-name">{{ stay.name }}</h1>

    <div class="rating">
      <img src="./../../assets/icons/star.png" class="rate-icon" />
      <span class="rate-span"> {{ avgRating }} </span>
      ({{ reviewsCount }} reviews)
      <div class="needs-to-be-completed">
        host type (superhost) + google location city+country
        {{ stay.loc.city }}, {{ stay.loc.country }}
      </div>
    </div>
  </section>
</template>





<script>
export default {
  components: {},
  name: "stay-details-header",
  props: {
    stay: Object,
  },
  data() {
    return {};
  },
  async created() {},
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
  methods: {},
};
</script>

<style>
.details-header-name {
  color: #222222;
  font-size: 1em !important;
  font-size: 26px !important;
  font-weight: inherit !important;
  line-height: inherit !important;
  margin: 0px !important;
  padding: 0px !important;
  display: inline !important;
}

.rate-span {
  overflow: clip !important;
  line-height: 20px !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  text-overflow: ellipsis !important;
  /* display: -webkit-box !important; */
  -webkit-line-clamp: 1 !important;
  -webkit-box-orient: vertical !important;
  color: rgb(34, 34, 34) !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    "Helvetica Neue", sans-serif !important;
  font-size: 14px !important;
  position: relative !important;
  font-weight: 600 !important;
}

.rate-icon {
  height: 14px;
  width: 14px;
}
</style>