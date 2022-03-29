<template>
  <section class = "main-app">

      <ul class="stay-list">
        <li
          v-for="stay in stays"
          :key="stay._id"
          
          @click="$router.push(`/stay/${stay._id}`)"
        >
          <stay-preview :stay="stay" />
        </li>
      </ul>
  </section>
</template>

<script>
import stayPreview from "./stay-preview.vue";

export default {
  name: "stay-list",
  props: {
    stays: Array,
  },
  components: {
    stayPreview,
  },
};
</script>

