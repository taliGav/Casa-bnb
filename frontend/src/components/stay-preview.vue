<template>
  <section class="stay-preview">
    <article class="preview-card">
      <div class="stay-imgs-container">
        <preview-carousel :urls="this.stay.imgUrls" />
      </div>
      <div class="flex column items-center justify-between gap-1">
        <div class="rating">⭐{{ avgRating }} ({{ reviewsCount }} reviews)</div>
        <p>{{ stay.type }} in {{ stay.loc.city }}, {{ stay.loc.country }}</p>
        <p class="preview-stay-title">{{ stay.name }}</p>
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
      let ratingSum = this.stay.reviews.reduce((acc, x) => acc + x.rate, 0);
      let avgRating = ratingSum / this.stay.reviews.length;
      return avgRating;
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

<style>

stay-preview {
  min-width:250px;
  padding:15px
}
</style>



// import customLabel from './custom-label.vue'

// stay specifics needed on stay card/preview-
// imgs carousle
//  type in place
// title : name
// max-cap,bedrooms, bed num , bath num \\ לא מופיע בתצוגה קטנה
// amenities: kitchen, free parking , Wifi \\ לא מופיע בתצוגה קטנה
// avg rating (reviews count)     price + currency/night
