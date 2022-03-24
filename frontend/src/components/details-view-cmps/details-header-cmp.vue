<template>
  <section v-if="stay" class="stay-details">
    <h2 class="uppercase">{{ stay.name }}</h2>

    <div class="rating">
      ⭐ {{ avgRating }} ({{ reviewsCount }} reviews) 
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
    return {
    };
  },
  async created() {
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
  methods: {
  },
};
</script>

<style>
.stay-details {
  padding-top: 100px;
}

</style>