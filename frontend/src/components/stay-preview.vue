<template>
  <section class="stay-preview">
          <div class="flex items-center justify-between gap-2">
            <h3 class="uppercase">{{ stay.name }}</h3>
            <p class="clr-teal fw-bold">${{ stay.price }}</p>
          </div>
          <div class="labels flex flex-wrap items-center gap-1">
            <!-- <custom-label
            v-for="label in stay.labels"
            :key="label"
            :label="label"
          /> -->
          </div>
    <!-- <slot></slot> -->
  </section>
</template>

<script>
// import customLabel from './custom-label.vue'

export default {
  name: 'stay-preview',
  props: {
    stay: Object,
  },
  components: {
    // customLabel,
  },
}
</script>