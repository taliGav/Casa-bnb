<template>
  <section class="dashboard py-2">
  <div class="app">
    <h1>Let's upload some images!</h1>
    <img-upload @save="saveImg" />
    <section>
      <img v-for="imgUrl in imgUrls" :key="imgUrl" :src="imgUrl" alt="" />
    </section>
  </div>
  </section>
</template>

<script>
  import imgUpload from './../components/host/img-upload.vue';

  export default {
    components: {imgUpload},
    data() {
      return {
        imgUrls: [],
      };
    },
    methods: {
      saveImg(imgUrl) {
        this.imgUrls.push(imgUrl);
        console.log('imgUrls', [...this.imgUrls]);
      },
    },
  };
</script>
