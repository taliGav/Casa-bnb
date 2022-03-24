<template>
  <section class="stay-filter py-2">
    <div v-for="amenitie in lessAmenities" :key="amenitie">
      <button @click="setAmenities(amenitie)">{{ amenitie }}</button>
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
      filterBy:{destination: '', dates: 'tt', guests: 0 ,amenities:[]},
    }
  },
  created() {
    this.filterBy = this.$route.query
    // console.log('created',this.$route.query);
    if(this.$route.query.amenities && typeof(this.$route.query.amenities)==='string'){
      this.filterBy.amenities=this.$route.query.amenities.split(',')||[]
    }
    else{
      this.filterBy.amenities=this.$route.query.amenities
    }
    
    // this.filterBy = this.curFilterBy
    // this.setFilter = utilService.debounce(this.setFilter, 500)
  },
  watch: {
        // 'filterBy': 'doFilter'
    },
  computed: {
    lessAmenities() {
      return this.$store.getters.lessAmenities
    },
    curFilterBy(){
      this.filterBy = this.$route.query
      return this.$route.query
    },
  },
  methods: {
    doFilter() {
      // console.log('yyyyyy');
      // var amenitiesToFilter=Object.values(this.amenities)
      // this.filterBy.amenities=amenitiesToFilter;
      // console.log('yyyyyy',this.filterBy);
      this.$router.push({ name: 'stay', query: {
          destination: this.filterBy.destination,
          dates: this.filterBy.dates,
          guests: this.filterBy.guests,
          amenities:this.filterBy.amenities } })
    },
    setAmenities(amenitie){
      // console.log('set amn amenitie', amenitie,this.filterBy.amenities);
      if(!this.filterBy.amenities){
        // console.log('no amn');
        this.filterBy.amenities=[amenitie]
        this.doFilter()
        return
      }
      const idx = this.filterBy.amenities.findIndex(am=>am===amenitie)
      // console.log('set amn idx', idx);
      if(idx===-1){
        this.filterBy.amenities.push(amenitie)
      }
      else{
        this.filterBy.amenities.splice(idx, 1,)
      }
      this.doFilter()
    }
  },
}
</script>
