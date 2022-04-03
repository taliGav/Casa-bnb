<template>
  <section class="">
    <div class="popular">
      <p>Popular Destinations</p>
      <ul class="popular-list">
        <li
          v-for="destination in popularDest"
          :key="destination"
          @click="
            $router.push({
              name: 'stay',
              query: {
                destination: destination.name,
              },
            })
          "
        >
          <popular-dest-preview :destination="destination" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import popularDestPreview from "./popular-dest-preview.vue";

export default {
  name: "popular-destinations-list",
  props: {
    popularDest: Array,
  },
  components: {
    popularDestPreview,
  },
};
</script>