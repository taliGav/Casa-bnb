<template>
  <section class="popular-preview">
    <img :src="stay.imgUrl" />
    <div class="preview-data">
      <p>{{ stay.name }},</p>
      <p>{{ stay.country }}</p>
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