<template>
	<section class="price-modal">
		<div class="slider">
			<HistogramSlider
				:width="400"
				:bar-height="100"
				:data="prices"
				:min="0"
				:max="maxPrice"
				@change="slider"
				primaryColor="rgb(163, 163, 163)"
				labelColor="rgb(151, 151, 151)"
				barRadius="1"
				barGap="2"
				barWidth="3"
			/>
		</div>
		<hr />
		<div class="price-modal-btns">
			<button>clear</button>
			<button @click="set">set</button>
		</div>
	</section>
</template>

<script>
import { ref } from 'vue';
export default {
	name: 'stay-filter-price',
	props: {
		stays: Array,
	},
	data() {
		return {
			prices: this.stays.map((stay) => stay.price),
			minPrice: 0,
			maxPrice: this.maxPrice,
		};
	},
	created() {
		this.max = this.maxPrice;
	},
	watch: {},
	computed: {
		maxPrice() {
			return Math.max(...this.prices);
		},
	},
	methods: {
		slider(event) {
			this.minPrice = event.from;
			this.maxPrice = event.to;
		},
		set() {
			this.$emit('setPrice', this.minPrice, this.maxPrice);
		},
	},
};
</script>
<style scoped></style>
