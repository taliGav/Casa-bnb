<template>
  <section class="carousel">
    <el-carousel :interval="2000" height="200px" width="300px" arrow="hover" class="img-container">
      <el-carousel-item  v-for="(url, idx) in urls" :key="idx">
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
  created() {
    // console.log('imgUrls',this.urls);
  },

  computed: {
    // imgUrl(){
    //   let imgNum = this.idx+1
    //   return '/src/assets/images/00' + imgNum + '.jpeg'
    // }
  },
};
</script>

<style scoped>

el-carousel-item {
  width: 300px;
  height: 200px;

}


/* .el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
</style>
