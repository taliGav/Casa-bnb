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

      <div class="dates-guests">
        <div class="dates flex space" @click="openCalender">
          <div class="check-in-container">
            <div class="check-in-title title">CHECK-IN</div>
            <div class="check-in-value"></div>
          </div>
          <div class="check-out-container">
            <div class="check-out-title title">CHECKOUT</div>
            <div class="check-out-value"></div>
          </div>
        </div>

        <div class="guests flex space" @click="openGuests">
          <div class="guests-container">
            <div class="guests-title title">GUESTS</div>
            <div class="guests-value"></div>
          </div>
        </div>

        <div class="calender-checkout-container">
          <!-- <calender-cmp /> -->
        </div>
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