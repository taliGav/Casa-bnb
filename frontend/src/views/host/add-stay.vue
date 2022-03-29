<template>
  <section class="add-stay-section">
  <div class="img-up-sec">
    <h1>Let's upload some images!</h1>
    <img-upload @save="saveImg" />
    <section>
      <img v-for="imgUrl in imgUrls" :key="imgUrl" :src="imgUrl" alt="" />
    </section>
  </div>
  </section>
</template>

<script>
  import imgUpload from './../../components/host/img-upload.vue'

  export default {
    name: 'add-stay',
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
