<template>
  <section class="stay-details-img-container">
    <div class="gallery-imgs-container">
      <img
        v-for="(imgUrl, idx) in this.stay.imgUrls"
        :key="idx"
        :src="imgUrl"
        :class="'gallery-img img-card-' + idx"
        alt=""
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "stay-details-gallery",
  props: {
    stay: Object,
  },
};
</script>