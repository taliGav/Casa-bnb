<template>
  <section class = "main-app">
    <!-- <button @click="$router.push('/stay/edit')" class="btn btn-secondary"> -->
      <!-- add a new stay -->
    <!-- </button> -->
    <!-- <div class=""> -->
      <ul class="stay-list flex wrap space ">
        <li
          v-for="stay in stays"
          :key="stay._id"
          class="stay-preview-container flex flex-col"
          @click="$router.push(`/stay/${stay._id}`)"
        >
          <stay-preview :stay="stay" />
        </li>
      </ul>
    <!-- </div> -->
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



  /* font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif; */
/* } */


/* placeholder search-bar: gray #717171;
font size 14 px 
font:
 */
/* placeholder search-bar: gray #717171;
font size 14 px 
font:


--dls19-brand-gradient-radial: radial-gradient(circle at center,
  #FF385C 0%,
  #E61E4D 27.5%,
  #E31C5F 40%,
  #D70466 57.5%,
  #BD1E59 75%,
  #BD1E59 100%
) !important;
 */
</style>
