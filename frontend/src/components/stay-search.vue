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
					:style="{ width: isSearchOpen ? '250px' : '270px' }"
				>
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
			filterBy: { destination: '', dates: '0', guests: 0, amenities: [] },
			value1: 0,
			isSearchOpen: false,
		};
	},
	created() {
		console.log('created query:', this.$route.query);
		this.filterBy = this.$route.query;
		// document.addEventListener('click', this.onClick);
		// this.filterBy.amenities=[this.$route.query.amenities]
		// this.filterBy = this.curFilterBy
	},
	mounted() {
		// document.querySelector('.stay-app')
		window.addEventListener('click', this.onClick);
	},
	unmounted() {
		window.removeEventListener('click', this.onClick);
	},
	computed: {
		curFilterBy() {
			this.filterBy = this.$route.query;
			return this.$route.query;
		},
	},
	methods: {
		doFilter() {
			console.log('yyyyyy');
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
		onClick(ev) {
			const btn = ev.target.className;
			const img = ev.target.localName;
			if (btn === 'search-btn-container' || img === 'img') return;
			else this.isSearchOpen = false;
			console.log(ev);

			// if(x < 889  )
			// if (!this.isSearchOpen) return;
		},
	},
};
</script>

// v-bind:style="{ height: stickyNav ? '80px' : '160px' }"
