<template>
  <section class="popular-preview">
    <img :src="destination.imgUrl" />
    <div class="preview-data">
      <p>{{ destination.name }},</p>
    </div>
  </section>
</template>

<script>
export default {
  components: {
  },
  name: "destination-preview",
  props: {
    destination: Object,
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