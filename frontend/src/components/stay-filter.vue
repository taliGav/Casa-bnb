<template>
  <section class="stay-filter py-2">
    <div>
      <el-checkbox-group v-model="amenities" size="large">
        <el-checkbox-button
          v-for="amenitie in lessAmenities"
          :key="amenitie"
          :label="amenitie"
        >
          {{ amenitie }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
  </section>
</template>

<script>
import { utilService } from '../services/util-service'
import { ref } from 'vue'
export default {
  name: 'stay-filter',
  data() {
    return {
      amenities : ref([]),
      filterBy:{destination: '', dates: '0', guests: 0 ,amenities:[]},
    }
  },
  created() {
    // this.filterBy = this.curFilterBy
    // this.setFilter = utilService.debounce(this.setFilter, 500)
  },
  watch: {
        'amenities': 'setFilter'
    },
  computed: {
    lessAmenities() {
      return this.$store.getters.lessAmenities
    },
    curFilterBy(){
      this.filterBy = this.$route.query
      return this.$route.query
    },
    amenitiesToFilter(){
      return Object.values(this.amenities)
    }
  },
  methods: {
    setFilter() {
      var amenitiesToFilter=Object.values(this.amenities)
      this.filterBy.amenities=amenitiesToFilter;
      return this.$router.push({ name: 'stay', query: {
          destination: this.filterBy.destination,
          dates: this.filterBy.dates,
          guests: this.filterBy.guests,
          amenities:this.filterBy.amenities } })
    },
  },
}
</script>
