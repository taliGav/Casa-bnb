<template>
  <section>
    <button @click="$router.push('/stay/edit')" class="btn btn-secondary">
      add a new stay
    </button>
    <div class="list-container flex flex-wrap items-center gap-1">
      <ul class="stay-list py-1 clean-list grid gap-2">
        <li
          v-for="stay in stays"
          :key="stay._id"
          class="stay-preview-container p-2 flex flex-col gap-1"
          @click="$router.push(`/stay/${stay._id}`)"
        >
          <stay-preview :stay="stay" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import CustomLabel from "./custom-label.vue";
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

<style>
</style>
