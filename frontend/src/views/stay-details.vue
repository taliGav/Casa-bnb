<template>
  <section v-if="stay" class="stay-details">
    <details-header :stay="stay" />
    <details-gallery :stay="stay" />

    <div class="details-main-container full flex space">
      <div class="main-inner-container">
        <details-host-main :stay="stay" />
      </div>
      <div class="checkout-container">
        <details-checkout :stay="stay" />
      </div>
    </div>
    <hr />
    <details-reviews :stay="stay" />

    <details-map :stay="stay" />

    <div v-if="user?.isAdmin" class="btn-group gap-1">
      <button
        @click="$router.push(`/stay/edit/${stay._id}`)"
        class="btn btn-primary"
      >
        edit stay
      </button>
      <button @click="$router.push('/stay')" class="btn btn-secondary">
        go back
      </button>
      <!-- <button @click="removeStay" class="btn btn-danger">delete stay</button> -->
    </div>
  </section>

  <!-- <p class="clr-teal fw-bold">${{ stay.price }} /NIGHT</p> -->
</template>



<script>
import detailsHeader from "./../components/details-view-cmps/details-header-cmp.vue";
import detailsGallery from "./../components/details-view-cmps/details-gallery-cmp.vue";
import detailsHostMain from "./../components/details-view-cmps/details-host-main-cmp.vue";
import detailsCheckout from "./../components/details-view-cmps/details-checkout-cmp.vue";
import detailsReviews from "./../components/details-view-cmps/details-reviews-cmp.vue";
import detailsMap from "./../components/details-view-cmps/details-map-cmp.vue";
import { stayService } from "./../services/stay-service.js";

export default {
  components: {
    detailsHeader,
    detailsGallery,
    detailsHostMain,
    detailsCheckout,
    detailsReviews,
    detailsMap,
  },

  name: "stay-details",
  data() {
    return {
      stay: null,
      reviewToAdd: null,
    };
  },
  async created() {
    const { id } = this.$route.params;
    this.stay = await stayService.getById(id);
    const user = this.$store.getters.user;

    // review-store
    // await this.$store.dispatch({
    //   type: "getReviews",
    //   filterBy: { stayId: this.stay._id },
    // });

    // if (user) {
    //   this.reviewToAdd = await reviewService.getEmptyReview();
    //   this.reviewToAdd.userId = user._id;
    //   this.reviewToAdd.stayId = this.stay._id;
    // }
  },
  computed: {
    user() {
      // return this.$store.getters.user;
    },
  },
  methods: {
    // removeStay() {
    //   this.$store.dispatch({ type: 'removeStay', stayId: this.stay._id }).then(() => {
    //     this.$router.push('/stay')
    //   })
    // },
  },
};
</script>


<style>

/* .reserve-btn {
  background-color: #ff385c;
  border: none;
  color: #fff;
  text-align: center;
  letter-spacing: 0.05rem;
  width: 100%;
  height: 48px;
  min-width: 200px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  transition: opacity 1.25s ease 0s !important;
}

.reserve-btn-pointer {
  border: 0;
  min-height: 4rem;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  color: #fff;
  font-weight: 700;
  font-size: 1.25rem;
  background-image: radial-gradient(
    circle at center,
    #ff385c 0,
    #e61e4d 27.5%,
    #e31c5f 40%,
    #d70466 57.5%,
    #bd1e59 75%,
    #bd1e59 100%
  );
  transition: opacity 1.25s ease 0s !important;
  min-width: 200px;
  background-size: 200% 200%;
  background-position: calc((100 - var(--mouse-x, 0)) * 1%)
    calc((100 - var(--mouse-y, 0)) * 1%);
} */
</style>