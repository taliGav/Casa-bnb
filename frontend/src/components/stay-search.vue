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
          size = "small"
        />
      </div>
    </div> -->
		<div class="filter">
			<input
				class="search-input"
				v-model="filterBy.destination"
				type="text"
				placeholder="search"
			/>
			<input
				class="guests-number"
				v-model="filterBy.guests"
				type="number"
				placeholder="guests"
			/>
			<RouterLink
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
			>
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
/* .el-range-input{
  width:100px;

} */

.filter {
	height: 64px;
	width: 850px;
	background-color: rgb(252, 239, 239);
	border-radius: 32px;
	position: relative;
	left: 100px;
}

.search-input {
	border-radius: 32px 0 0 32px;
	width: 270px;
  height: 64px;
	position: absolute;
	left: 0px;
}

.guests-number {
	position: absolute;
  border-radius: 0 32px 32px 0;
  height: 64px;
  right: 0;
}

.search-btn {
	position: absolute;
  border-radius: 50%;
  background-color: red;
  width: 50px;
  height: 50px;
  right: 10px;
  top: 5px;
}
</style>
