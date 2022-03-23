<template>
  <form>
    <input v-model="filterBy.destination" type="text" placeholder="dest" />

    <div class="demo-date-picker">
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="|"
          start-placeholder="Add dates"
          end-placeholder="Add dates"
        />
      </div>
    </div>

    <input v-model="filterBy.guests" type="number" />
    <RouterLink
      :to="{
        name: 'stay',
        query: {
          destination: filterBy.destination,
          dates: filterBy.dates,
          guests: filterBy.guests,
        },
      }"
      >search</RouterLink
    >
  </form>
</template>


<script>
import { ref } from 'vue'
export default {
  name: 'search',
  data() {
    return {
      filterBy: { destination: '', dates: '0', guests: 0 },
      value1:0,

    }
  },
  created() {
    this.filterBy = this.curFilterBy
  },
  computed: {
    curFilterBy(){
      return this.$route.query
    },
    // value1(){
    //   return ref('')
    // }
  },
  methods: {
  },
}
</script>