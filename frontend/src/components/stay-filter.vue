<template>
  <section class="stay-filter flex align">
    <button @click="togglePrice">price</button>
    <stay-filter-price v-if="openPrice" :stays="stays" @setPrice="setPrice" />
    <div v-for="amenity in lessAmenities" :key="amenity">
      <button
        :class="{ 'active-btn': classes[amenity] }"
        @click="setAmenities(amenity)"
      >
        {{ amenity }}
      </button>
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
        minPrice:null,
        maxPrice:null
      },
      openPrice:false,
      classes:{
        price:false,
        'free cancellation':false,
      }
    }
  },
  created() {
    if(this.$route.query.amenities && typeof(this.$route.query.amenities)==='string'){
      this.filterBy.amenities=this.$route.query.amenities.split(',')||[]
    }
    else{
      this.filterBy.amenities=this.$route.query.amenities
    }
  },
  computed: {
    curFilterBy() {
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
			this.$router.push({
				name: 'stay',
				query: {
					destination: this.filterBy.destination,
					guests: this.filterBy.guests,
          amenities: this.filterBy.amenities,
          minPrice:this.filterBy.minPrice,
          maxPrice:this.filterBy.maxPrice,
				},
			});
      },
    setAmenities(amenity){
      if(!this.filterBy.amenities){
        this.filterBy.amenities=[amenity]
        this.doFilter()
        return
      }
      const idx = this.filterBy.amenities.findIndex(am=>am===amenity)
      if(idx===-1){
        this.filterBy.amenities.push(amenity)
      }
      else{
        this.filterBy.amenities.splice(idx, 1,)
      }
      // this.classes[amenity]= !this.classes[amenity]
      // console.log('classsss!!!!',this.classes[amenity]);
      this.doFilter()
    },
    togglePrice(){
      this.openPrice=!this.openPrice
    },
    setPrice(minPrice,maxPrice){
      this.togglePrice()
      this.filterBy.minPrice=minPrice;
      this.filterBy.maxPrice=maxPrice;
      this.doFilter()
    },
    class(){

    }
  },
  components: {
    stayFilterPrice,
  },
}
</script>
