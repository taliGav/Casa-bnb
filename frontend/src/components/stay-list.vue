<template>
  <section class="list-container">
    <button @click="$router.push('/stay/edit')" class="btn btn-secondary">
      add a new stay
    </button>
    <ul class="stay-list py-1 clean-list grid gap-2">
      <stay-preview v-for="stay in stays" :key="stay._id" :stay="stay">
        <li
          @click="$router.push(`/stay/${stay._id}`)"
          class="stay-preview p-2 flex flex-col gap-1"
        >
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
        </li>
      </stay-preview>
    </ul>
  </section>
</template>

<script>
import CustomLabel from "./custom-label.vue";
import stayPreview from "./stay-preview.vue";

// import CustomLabel from './custom-label.vue'
import stayPreview from './stay-preview.vue'

export default {
  name: "stay-list",
  props: {
    stays: Array,
  },
  components: {
    stayPreview,
    // CustomLabel,
  },
};
</script>

<style>
</style>
