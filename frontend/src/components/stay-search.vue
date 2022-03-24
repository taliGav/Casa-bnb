<template>
  <form>
    <!-- <input v-model="filterBy.destination" type="text" placeholder="dest" /> -->

    <!-- <div class="demo-date-picker">
			<div class="block">
				<el-date-picker
					v-model="value1"
					type="daterange"
					range-separator="|"
					start-placeholder="Add dates"
					end-placeholder="Add dates"
					size="small"
				/>
			</div>
		</div> -->
    <div class="filter">
      <div class="search-container">
        <span>Location</span>
        <input
          class="search-input"
          v-model="filterBy.destination"
          type="text"
          placeholder="Where are you going?"
        />
      </div>
      <div class="date-start">
        <span>Check in</span>
        <p>Add dates</p>
      </div>
      <div class="date-end">
        <span>Check out</span>
        <p>Add dates</p>
      </div>
      <div class="search-guests">
        <div class="guests-container">
          <span>Guests</span>
          <p>Add guests</p>
          <input v-model="filterBy.guests" type="number" />
          <!-- <input
						class="guests-input"
						v-model="filterBy.guests"
						type="number"
						placeholder="guests"
					/> -->
        </div>

        <div @click="doFilter" class="search-btn-container">
          <img src="../assets/Images/logos/search-icon.svg" alt="" />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
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
