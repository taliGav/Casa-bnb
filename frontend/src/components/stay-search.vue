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
					<!-- <input
						class="guests-input"
						v-model="filterBy.guests"
						type="number"
						placeholder="guests"
					/> -->
				</div>

				<div class="search-btn-container">
					<img  src="../assets/Images/logos/search-icon.svg" alt="">
					<!-- <RouterLink
						class="search-btn"
						:to="{
							name: 'stay',
							query: {
								destination: filterBy.destination,
								dates: filterBy.dates,
								guests: filterBy.guests,
							},
						}"
						>S</RouterLink
					> -->
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
			filterBy: { destination: '', dates: '0', guests: 0 },
			value1: 0,
		};
	},
	created() {
		this.filterBy = this.curFilterBy;
	},
	computed: {
		curFilterBy() {
			return this.$route.query;
		},
		// value1(){
		//   return ref('')
		// }
	},
	methods: {},
};
</script>

<style>

</style>
