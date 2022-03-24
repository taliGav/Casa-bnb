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
    <button @click="doFilter">search</button>
  </form>
</template>


<script>
import { ref } from 'vue'
export default {
  name: 'search',
  data() {
    return {
      filterBy: { destination: '', dates: '0', guests: 0 ,amenities:[]},
      value1:0,

    }
  },
  created() {
    console.log('created query:',this.$route.query);
    this.filterBy = this.$route.query
    // this.filterBy.amenities=[this.$route.query.amenities]
    // this.filterBy = this.curFilterBy
  },
  computed: {
    curFilterBy(){
      this.filterBy = this.$route.query
      return this.$route.query
    },
  },
  methods: {
    doFilter() {
      console.log('yyyyyy');
      // var amenitiesToFilter=Object.values(this.amenities)
      // this.filterBy.amenities=amenitiesToFilter;
      // console.log('yyyyyy',this.filterBy);
      this.$router.push({ name: 'stay', query: {
          destination: this.filterBy.destination,
          dates: this.filterBy.dates,
          guests: this.filterBy.guests,
          amenities:this.filterBy.amenities } })
    },
  },
}
</script>