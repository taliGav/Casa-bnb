<template>
  <section>
    <button @click="$router.push('/stay/edit')" class="btn btn-secondary">
      add a new stay
    </button>
    <div class="list-container items-center justify-between">
      <ul class="stay-list flex clean-list">
        <li
          v-for="stay in stays"
          :key="stay._id"
          class="stay-preview-container flex flex-col"
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
/* ul.stay-list { */
/* display: grid;
  grid-template-columns: repeat(4, auto);
  grid-auto-flow: row;
  align-items: stretch;
  grid-gap: 20px; */
/* } */
</style>
