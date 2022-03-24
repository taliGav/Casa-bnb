<template>
  <section v-if="stay" class="stay-details-header">
    <h1 class="details-header-name">{{ stay.name }}</h1>

    <div class="rating flex">
      <img src="./../../assets/icons/star.png" class="rate-icon" />
      <span class="rate-span"> {{ avgRating }} </span> ·
      <u>{{ reviewsCount }} reviews</u>  
      <span class="details-header-location">
          · google location city+country
        <u> {{ stay.loc.city }}, {{ stay.loc.country }} </u>
      </span>
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
  font-size: 1em !important;
  font-size: 26px !important;
  font-weight: inherit !important;
  line-height: inherit !important;
  margin: 0px !important;
  padding: 0px !important;
  display: inline !important;
}

.rating {
  margin-top:4px;
  font-size: 14px;
  color: #222222;
  align-items:center;
  gap:5px;
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

.details-header-location {
  color: #717171;
}
</style>