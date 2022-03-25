<template>
  <section v-if="stay" class="details-checkout">
    <div class="checkout-modal">
      <div class="price-and-rate flex">
        <div class="price-per-night">
          <span class="price">${{ stay.price }}</span>
          <span class="night">/night</span>
        </div>
        <div class="rating flex"></div>
      </div>

      <div class="calender-checkout-container"></div>
      <div class="reserve-btn-cmp">
        <reserve-btn />
      </div>
    </div>
  </section>
</template>





<script>
import reserveBtn from "./../reusable-cmps/reserve-btn-cmp.vue";

export default {
  components: {
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


<style>
.checkout-modal {
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
}
</style>