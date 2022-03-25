<template>
  <section v-if="stay" class="details-checkout">
    <div class="checkout-modal">
      <div class="price-and-rate flex space">
        <div class="price-per-night">
          <span class="price">${{ stay.price }}</span>
          <span class="night">/night</span>
        </div>
        <ratings-reviews :stay="stay" />
      </div>

      <div class="calender-checkout-container">
        <!-- <calender-cmp /> -->
      </div>

      <div class="reserve-btn-cmp">
        <reserve-btn />
      </div>
    </div>
  </section>
</template>





<script>
import ratingsReviews from "./../reusable-cmps/ratings-reviews-cmp.vue";
import reserveBtn from "./../reusable-cmps/reserve-btn-cmp.vue";

export default {
  components: {
    ratingsReviews,
    reserveBtn,
  },
  name: "details-checkout",
  props: {
    stay: Object,
  },
  data() {
    return {};
  },
  async created() {},
  computed: {},
  methods: {},
};
</script>