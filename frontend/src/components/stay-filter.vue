<template>
	<section class="stay-filter flex align">
		<div class="price-btn-container">
			<button class="" @click="togglePrice">
				price
				<img
					:class="{ flip: isClicked }"
					src="../assets/icons/dropdown.png"
					alt=""
				/>
			</button>
		</div>

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
import { utilService } from '../services/util-service';
import stayFilterPrice from './stay-filter-price.vue';
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
				minPrice: null,
				maxPrice: null,
			},
			// filterBy: null,
			openPrice: false,
			classes: {
				price: false,
				'free cancellation': false,
				wifi: false,
				kitchen: false,
				'air conditioning': false,
				washer: false,
			},
			isClicked: false,
		};
	},
	created() {
		this.setFilter();
	},
	computed: {
		curFilterBy() {
			return this.$store.getters.filterBy;
		},
		lessAmenities() {
			return this.$store.getters.lessAmenities;
		},
	},
	methods: {
		setFilter() {
			const { destination, guests, minPrice, maxPrice } = this.curFilterBy;
			this.filterBy = { destination, guests, minPrice, maxPrice };
			const amenities = this.curFilterBy.amenities;
			if (amenities && typeof amenities === 'string') {
				this.filterBy.amenities = [];
				this.filterBy.amenities.push(amenities);
			} else {
				this.filterBy.amenities = amenities;
			}
			if (this.filterBy.amenities) {
				this.filterBy.amenities.forEach((amenity) => {
					this.classes[amenity] = true;
				});
			}
		},
		doFilter() {
			this.$router.push({
				name: 'stay',
				query: {
					destination: this.filterBy.destination,
					guests: this.filterBy.guests,
					amenities: this.filterBy.amenities,
					minPrice: this.filterBy.minPrice,
					maxPrice: this.filterBy.maxPrice,
				},
			});
		},
		setAmenities(amenity) {
			console.log(this.filterBy.amenities);
			if (!this.filterBy.amenities) {
				this.filterBy.amenities = [amenity];
				this.classes[amenity] = !this.classes[amenity];
				this.doFilter();
				return;
			}
			const idx = this.filterBy.amenities.findIndex((am) => am === amenity);
			if (idx === -1) {
				this.filterBy.amenities.push(amenity);
			} else {
				this.filterBy.amenities.splice(idx, 1);
			}
			this.classes[amenity] = !this.classes[amenity];
			this.doFilter();
		},
		togglePrice() {
			this.openPrice = !this.openPrice;
			this.isClicked = !this.isClicked;
		},
		setPrice(minPrice, maxPrice) {
			this.togglePrice();
			this.filterBy.minPrice = minPrice;
			this.filterBy.maxPrice = maxPrice;
			this.doFilter();
		},
		class() {},
	},
	components: {
		stayFilterPrice,
	},
};
</script>
