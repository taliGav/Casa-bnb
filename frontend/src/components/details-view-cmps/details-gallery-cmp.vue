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


.snip0016 {
  height: 4rem;
  width: 4rem;
  border: 1 solid #000;
  background-color: tomato;
}
.snip0016:hover {
  background-color: rgba(0, 235, 125, 0.3);
}


/* ._z80d2i */
.gallery-imgs-container {
  display: grid;
  max-height: 374px;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 50% 50%;
  grid-gap: 8px;
}

/* @media (min-width: 744px)
._88xxct {
    display: block !important;
} */

.gallery-img {
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.25s ease-in-out;
}

.gallery-img:hover {
  /* background: rgba(0, 0, 0, 0.5) */
  /* background-color: hwb(0 0% 100% / 0.664); */
  opacity: 0.7;
}

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

.gallery-img {
  object-fit: cover;
  vertical-align: bottom;
  width: 100%;
  height: 100%;
  /* position: absolute; */
}
</style>