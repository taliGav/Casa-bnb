<template>
  <section class="carousel">
    <el-carousel :interval="2500" type="card" height="300px">
      <el-carousel-item v-for="(_, idx) in 5" :key="idx">
        <img
          class="img-in-card"
          :src="'/src/assets/images/00' + idx + '.jpeg'"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script>
export default {
  name: "carousel",
  computed: {},
};
</script>
