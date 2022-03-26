<template>
  <section class="popular-preview">
    <img :src="stay.imgUrl" />
    <div class="preview-data">
      <div class="stay-loc">
        <p class="preview-stay-title">{{ stay.name }},</p>
        <p>{{ stay.country }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
  },
  name: "stay-preview",
  props: {
    stay: Object,
  },
  data() {
    return {};
  },
  computed: {
  },
};
</script>

<style>
</style>