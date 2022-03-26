<template>
  <section class="stay-filter flex align">
    <button @click="togglePrice">price</button>
    <stay-filter-price v-if="openPrice" :stays="stays" @setPrice="setPrice" />
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
  props: {
    stays: Array,
  },
  data() {
    return {
      filterBy: {
        destination: '',
        guests: '',
        amenities: [],
        priceRange: null,
      },
      openPrice:false,
    }
  },
  created() {
    console.log('created fil 1:',this.filterBy);
    this.setFilter()
    console.log('created fil 2:',this.filterBy);
    if(this.$route.query.amenities && typeof(this.$route.query.amenities)==='string'){
      this.filterBy.amenities=this.$route.query.amenities.split(',')||[]
    }
    else{
      this.filterBy.amenities=this.$route.query.amenities
    }
    console.log('created fil 3:',this.filterBy);
  },
  computed: {
    curFilterBy() {
      // console.log(this)
      // this.destination=this.$store.getters.filterBy.destination
      // this.guests=this.$store.getters.filterBy.guests
      // this.priceRange=this.$store.getters.filterBy.priceRange
      // console.log(this)
			return this.$store.getters.filterBy
		},
    lessAmenities() {
      return this.$store.getters.lessAmenities
    },
  },
  methods: {
    setFilter(){
      this.filterBy = this.curFilterBy
    },
    doFilter() {
      // const copyAmenities = JSON.parse(JSON.stringify(this.filterBy.amenities))
			this.$router.push({
				name: 'stay',
				query: {
					destination: this.filterBy.destination,
					guests: this.filterBy.guests,
          amenities: this.filterBy.amenities,
          minPrice:this.filterBy.priceRange.min,
          maxPrice:this.filterBy.priceRange.max,
				},
			});
      },
    setAmenities(amenitie){
      if(!this.filterBy.amenities){
        this.filterBy.amenities=[amenitie]
        this.doFilter()
        return
      }
      const idx = this.filterBy.amenities.findIndex(am=>am===amenitie)
      if(idx===-1){
        this.filterBy.amenities.push(amenitie)
      }
      else{
        this.filterBy.amenities.splice(idx, 1,)
      }
      this.doFilter()
    },
    togglePrice(){
      this.openPrice=!this.openPrice
    },
    setPrice(priceRange){
      this.togglePrice()
      console.log('priceRange',priceRange);
      this.filterBy.priceRange=priceRange;
      this.doFilter()
    }
  },
  components: {
    stayFilterPrice,
  },
}
</script>
