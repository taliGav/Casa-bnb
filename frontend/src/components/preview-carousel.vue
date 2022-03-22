<template>
  <section class="carousel">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="(_, idx) in 12" :key="idx">
        <img
          class="img-in-card"
          :src="'/src/assets/images/' + idx + '.png'"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script>
export default {
  name: "carousel",
};
</script>
