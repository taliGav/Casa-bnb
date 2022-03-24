<template>
  <section class="carousel">
    <el-carousel
      :autoplay="false"
      trigger="click"
      :interval="2000"
      height="200px"
      width="100%"
      arrow="hover"
      class="img-container"
    >
      <el-carousel-item v-for="(url, idx) in urls" :key="idx">
        <svg
          class="preview-like-btn"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <path
            d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"
          ></path>
        </svg>

        <img :src="url" class="img-in-card" alt="" />
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script>
export default {
  name: "carousel",
  props: {
    urls: Array,
  },

  data() {
    return {};
  },
  created() {},

  computed: {},
  methods: {},
};
</script>

<style scoped>
.preview-like-btn {
  display: inline;
  position: absolute;
  top: 10px;
  right: 10px;
  overflow: visible;
  width: 24px;
  height: 24px;
  stroke: #ffffff;
  stroke-width: 2;
  fill: rgba(0, 0, 0, 0.5);
}
</style>


      <!-- indicator-position="none" -->
