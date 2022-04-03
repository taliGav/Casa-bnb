<template>
  <section class="">
    <div class="popular">
      <p>Popular Stays</p>
      <ul class="popular-list">
        <li
          v-for="stay in popularStays"
          :key="stay._id"
          @click="$router.push(`/stay/${stay._id}`)"
        >
          <popular-stay-preview :stay="stay" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import popularStayPreview from "./popular-stay-preview.vue";

export default {
  name: "popular-stays-list",
  props: {
    popularStays: Array,
  },
  components: {
    popularStayPreview,
  },
};
</script>