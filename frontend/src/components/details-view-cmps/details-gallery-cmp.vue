<template>
  <section class="stay-details-img-container">
    <div class="img-container">
      <!-- <img :src="imgUrl" :class="imgClass(idx)" alt="" /> -->
      <img
        v-for="(imgUrl, idx) in this.stay.imgUrls"
        :key="idx"
        :src="imgUrl"
        :class="'img-card-' + idx"
        alt=""
      />
    </div>
  </section>
</template>





<script>
export default {
  components: {},
  name: "stay-details-gallery",
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
.stay-details-img-container {
  padding-top: 24px;
  border-radius: 12px;
}

/* ._z80d2i */
.img-container {
  display: grid;
  max-width: 1120px;
  max-height: 560px;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 50% 50%;
  grid-gap: 8px;
}

/* @media (min-width: 744px)
._88xxct {
    display: block !important;
} */

.img-card-0 {
  grid-column: 1;
  grid-row: 1/3;
  border-radius: 12px 0 0 12px;
}

.img-card-2 {
  border-radius: 0 12px 0 0;
}

.img-card-4 {
  border-radius: 0 0 12px 0;
}

/* img {
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    font-style: inherit !important;
    font-variant: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: underline !important;
    display: block !important;
    height: 100% !important;
    position: relative !important;
    width: 100% !important;
    -webkit-tap-highlight-color: transparent !important;
    outline: none !important;
    } */

img {
  object-fit: cover;
  vertical-align: bottom;
  width: 100%;
  height: 100%;
  /* position: absolute; */
}
</style>