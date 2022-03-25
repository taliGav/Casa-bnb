<template>
	<div class="filter-container main-layot full flex align just">
		<form>
			<div class="filter">
				<div
					class="search-container"
					@click="focusSearch"
					:style="{ width: isSearchOpen ? '250px' : '270px' }"
				>
					<span>Location</span>
					<input
						class="search-input"
						v-model="destination"
						type="text"
						placeholder="Where are you going?"
						ref="input"
					/>
				</div>
				<div class="date-start" @click="showDatePicker">
					<span>Check in</span>
					<p>{{ startDate }}</p>
				</div>
				<div class="date-end" @click="showDatePicker">
					<span>Check out</span>
					<p>{{ endDate }}</p>
					<el-date-picker
						v-model="pickedDates"
						type="daterange"
						range-separator="To"
						start-placeholder="Start date"
						end-placeholder="End date"
					/>
				</div>
				<div class="search-guests" @click="addGuests">
					<div class="guests-container">
						<span>Guests</span>
						<p>{{ guests }}</p>
						<div
							v-if="addGuestsMenu"
							class="guests-input-modal flex around align"
						>
							<button @click.stop="changeGuests(-1)" class="btn-round">
								-
							</button>
							<div>{{ guests }}</div>
							<button @click.stop="changeGuests(+1)" class="btn-round">
								+
							</button>
						</div>
					</div>
				</div>
				<div
					@click="openSearch"
					class="search-btn-container"
					:style="{ width: isSearchOpen ? '130px' : '50px' }"
				>
					<img src="../assets/Images/logos/search-icon.svg" alt="" />
					<p
						v-if="isSearchOpen"
						:style="{ opacity: isSearchOpen ? '100%' : '0%' }"
					>
						Search
					</p>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
	// setup() {
	// 	const date = ref();
	// 	onMounted(() => {
	// 		const startDate = new Date();
	// 		const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
	// 		date.value = [startDate, endDate];
	// 	});
	// 	return {
	// 		pickedDates: null,
	// 	};
	// },
	name: 'search',
	data() {
		return {
			isSearchOpen: false,
			addGuestsMenu: false,
			destination: '',
			dates: '0',
			guests: null,
			amenities: [],
			pickedDates: null,
		};
	},
	created() {},
	mounted() {
		window.addEventListener('click', this.clickCheck);
		//
	},
	unmounted() {
		window.removeEventListener('click', this.clickCheck);
	},
	computed: {
		curFilterBy() {
			console.log('getter', this.$store.getters.filterBy);
			return this.$store.getters.filterBy;
		},
		startDate() {
			if (this.pickedDates) {
				const startDate = new Date(this.pickedDates[0]);
				return (
					new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
						startDate
					) +
					' ' +
					startDate.getDate()
				);
			} else {
				return 'Add dates';
			}
		},
		endDate() {
			if (this.pickedDates) {
				const endDate = new Date(this.pickedDates[1]);
				return (
					new Intl.DateTimeFormat('en-US', { month: 'long' }).format(endDate) +
					' ' +
					endDate.getDate()
				);
			} else {
				return 'Add dates';
			}
		},
	},
	methods: {
		async doFilter() {
			this.amenities = this.curFilterBy.amenities;
			const filterBy = await this.$store.dispatch({
				type: 'setFilter',
				destination: this.destination,
				guests: this.guests,
				amenities: this.amenities,
			});
			this.$router.push({
				name: 'stay',
				query: {
					destination: filterBy.destination,
					// dates: filterBy.dates,
					guests: filterBy.guests,
					amenities: filterBy.amenities,
				},
			});
		},
		showDatePicker() {
			this.$el.querySelector('.el-range-editor').click();
			// console.log(this.pickedDates);
			console.log('picked dates', this.startDate);
		},
		openSearch() {
			if (this.isSearchOpen) this.doFilter();
			this.isSearchOpen = true;
		},
		focusSearch() {
			this.$refs.input.focus();
			this.isSearchOpen = true;
		},
		clickCheck(ev) {
			const el = ev.target.className;
			const local = ev.target.localName;
			if (
				local === 'img' ||
				local === 'p' ||
				local === 'span' ||
				el === 'search-btn-container' ||
				el === 'search-container' ||
				el === 'search-input' ||
				el === 'date-start' ||
				el === 'date-end' ||
				el === 'guests-container'
			)
				return;
			else {
				this.isSearchOpen = false;
				this.addGuestsMenu = false;
			}
		},
		addDates() {
			this.isSearchOpen = true;
			this.dateMenu = !this.dateMenu;
		},
		addGuests() {
			this.isSearchOpen = true;
			this.addGuestsMenu = !this.addGuestsMenu;
		},
		changeGuests(num) {
			if (typeof this.guests === 'string') this.guests = 0;

			if (num < 0 && this.guests < 1.5) {
				this.guests = 'Add guests';
				return;
			}
			this.guests += num;
		},
	},
	components: {},
};
</script>

<style></style>
