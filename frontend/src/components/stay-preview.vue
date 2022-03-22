<template>
  <section class="stay-preview">
    <article class="preview-card">
      <div class="stay-imgs-container">
        <preview-carousel> </preview-carousel>
      </div>
      <div class="flex items-center justify-between gap-2">
        <!-- <p>{{ stay.type }} in {{ stay.loc.country }}</p> -->
        <!-- <p>{{stay.type}} in {{stay.loc.country}}</p> -->
        <h3 class="uppercase">{{ stay.name }}</h3>

        <div class="rating">⭐{{ avgRating }} ({{ reviewsCount }} reviews)</div>

        <p class="clr-teal fw-bold">${{ stay.price }} /NIGHT</p>
      </div>
    </article>
    <div class="labels flex flex-wrap items-center gap-1">
      <!-- <custom-label
            v-for="label in stay.labels"
            :key="label"
            :label="label"
          /> -->
    </div>
    <!-- <slot></slot> -->
  </section>
</template>

<script>
import PreviewCarousel from "./preview-carousel.vue";

export default {
  name: "stay-preview",
  props: {
    stay: Object,
  },
  data() {
    return {};
  },

  components: {
    PreviewCarousel,
    // customLabel,
  },
  computed: {
    avgRating() {
      let ratingSum = this.stay.reviews.reduce((a,b) => (a.rate + b.rate));
      console.log("ratingSum", ratingSum);
      console.log("stay.reviews.length", this.stay.reviews.length);
      let avgRating = ratingSum / this.stay.reviews.length;
      return avgRating;
    },
    reviewsCount() {
      return this.stay.reviews.length;
    },
  },
};
</script>


// import customLabel from './custom-label.vue'

// stay specifics needed on stay card/preview-
// imgs carousle
//  type in place
// title : name
// max-cap,bedrooms, bed num , bath num \\ לא מופיע בתצוגה קטנה
// amenities: kitchen, free parking , Wifi \\ לא מופיע בתצוגה קטנה
// avg rating (reviews count)     price + currency/night
