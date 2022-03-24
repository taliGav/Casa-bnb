<template>
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
						v-model="filterBy.destination"
						type="text"
						placeholder="Where are you going?"
						ref="input"
					/>
				</div>
				<div class="date-start" @click="addDates">
					<span>Check in</span>
					<p>Add dates</p>
				</div>
				<div class="date-end" @click="addDates">
					<span>Check out</span>
					<p>Add dates</p>
				</div>
				<div class="search-guests" @click="addGuests">
					<div class="guests-container">
						<span>Guests</span>
						<p>{{ filterBy.guests }}</p>
						<!-- <input v-model="filterBy.guests" type="number" /> -->
						<!-- <input
						class="guests-input"
						v-model="filterBy.guests"
						type="number"
						placeholder="guests"
					/> -->
						<div
							v-if="addGuestsMenu"
							class="guests-input-modal flex around align"
						>
							<!-- <div class="guests-counter flex space"> -->
							<button @click.stop="changeGuests(-1)" class="btn-round">
								-
							</button>
							<div>{{ filterBy.guests }}</div>
							<button @click.stop="changeGuests(+1)" class="btn-round">
								+
							</button>
							<!-- </div> -->
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
				<!-- <pre>{{ isSearchOpen }}</pre> -->
			</div>
		</form>
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
	name: 'search',
	data() {
		return {
			filterBy: { destination: '', dates: '0', guests: null, amenities: [] },
			value1: 0,
			isSearchOpen: false,
			addGuestsMenu: false,
		};
	},
	created() {
		// console.log('created query:', this.$route.query);
		this.filterBy = this.$route.query;
		// document.addEventListener('click', this.onClick);
		// this.filterBy.amenities=[this.$route.query.amenities]
		// this.filterBy = this.curFilterBy
		this.filterBy.guests = 'Add guests';
	},
	mounted() {
		// document.querySelector('.stay-app')
		window.addEventListener('click', this.clickCheck);
	},
	unmounted() {
		window.removeEventListener('click', this.clickCheck);
	},
	computed: {
		curFilterBy() {
			this.filterBy = this.$route.query;
			return this.$route.query;
		},
	},
	methods: {
		doFilter() {
			// var amenitiesToFilter=Object.values(this.amenities)
			// this.filterBy.amenities=amenitiesToFilter;
			// console.log('yyyyyy',this.filterBy);
			this.$router.push({
				name: 'stay',
				query: {
					destination: this.filterBy.destination,
					dates: this.filterBy.dates,
					guests: this.filterBy.guests,
					amenities: this.filterBy.amenities,
				},
			});
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
		},
		addGuests() {
			this.isSearchOpen = true;
			this.addGuestsMenu = !this.addGuestsMenu;
		},
		changeGuests(num) {
			if (typeof this.filterBy.guests === 'string') this.filterBy.guests = 0;

			if (num < 0 && this.filterBy.guests < 1.5) {
				this.filterBy.guests = 'Add guests';
				return;
			}
			this.filterBy.guests += num;
		},
	},
};
</script>
