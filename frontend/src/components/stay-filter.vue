<template>
  <section class="stay-filter flex space align">
    <!-- <stay-filter-price /> -->
    <div v-for="amenitie in lessAmenities" :key="amenitie">
      <button @click="setAmenities(amenitie)">{{ amenitie }}</button>
    </div>
  </section>
</template>

<script>
import { utilService } from '../services/util-service'
import stayFilterPrice from './stay-filter-price.vue'
export default {
  name: 'stay-filter',
  data() {
    return {
      destination: '',
      dates: '0',
      guests: null,
      amenities:[],
    }
  },
  created() {
    if(this.$route.query.amenities && typeof(this.$route.query.amenities)==='string'){
      this.amenities=this.$route.query.amenities.split(',')||[]
    }
    else{
      this.amenities=this.$route.query.amenities
    }
  },
  computed: {
    curFilterBy() {
      console.log(this)
      this.destination=this.$store.getters.filterBy.destination
      this.guests=this.$store.getters.filterBy.guests
      console.log(this)
			return this.$store.getters.filterBy
		},
    lessAmenities() {
      return this.$store.getters.lessAmenities
    },
  },
  methods: {
    async doFilter() {
      console.log('filter do');
      var temp = this.curFilterBy
      const copyAmenities = JSON.parse(JSON.stringify(this.amenities))
      const filterBy = await this.$store.dispatch({ type: 'setFilter', destination: this.destination, guests:this.guests,amenities:copyAmenities })
      // console.log('filter do :',filterBy);
			this.$router.push({
				name: 'stay',
				query: {
					destination: this.destination,
					// dates: filterBy.dates,
					guests: this.guests,
					amenities: filterBy.amenities,
				},
			});
      },
    setAmenities(amenitie){
      // console.log('set amn amenitie', amenitie,this.filterBy.amenities);
      if(!this.amenities){
        // console.log('no amn');
        this.amenities=[amenitie]
        this.doFilter()
        return
      }
      const idx = this.amenities.findIndex(am=>am===amenitie)
      // console.log('set amn idx', idx);
      if(idx===-1){
        this.amenities.push(amenitie)
      }
      else{
        this.amenities.splice(idx, 1,)
      }
      this.doFilter()
    }
  },
  components: {
    stayFilterPrice,
  },
}
</script>
