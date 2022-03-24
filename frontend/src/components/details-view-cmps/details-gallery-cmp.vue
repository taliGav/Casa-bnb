<template>
    <section  class="stay-details-img-container">
      <!-- <img :src="imgUrl" :class="imgClass(idx)" alt="" /> -->
      <img v-for="(imgUrl, idx) in this.stay.imgUrls"
      :key="idx" :src="imgUrl" :class="'img-card-' + idx" alt="" />
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
    return {
    };
  },
  async created() {
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style>

.stay-details-img-container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 8px;
  border-radius: 10px
}

.img-card-0 {
  grid-column: 1;
  grid-row: 1/3;
}

img{
  object-fit:cover;
  width:100%;
  height:100%
}

</style>