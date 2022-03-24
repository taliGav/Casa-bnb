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
						v-model="filterBy.destination"
						type="text"
						placeholder="Where are you going?"
						ref="input"
					/>
				</div>
				<div class="date-start" @click="addDates">
					<span>Check in</span>
					<p>Add dates</p>
					<Datepicker
						class="date-picker"
						v-if="dateMenu"
						v-model="date"
						inline
						
						autoApply
					/>
				</div>
				<div class="date-end" @click="addDates">
					<span>Check out</span>
					<p>Add dates</p>
				</div>
				<div class="search-guests" @click="addGuests">
					<div class="guests-container">
						<span>Guests</span>
						<p>{{ filterBy.guests }}</p>
						<div
							v-if="addGuestsMenu"
							class="guests-input-modal flex around align"
						>
							<button @click.stop="changeGuests(-1)" class="btn-round">
								-
							</button>
							<div>{{ filterBy.guests }}</div>
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
		<pre>{{date}}</pre>
	</div>
</template>

<script>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
	setup() {
		const date = ref(new Date());
		return {
			date,
		};
	},

	name: 'search',
	data() {
		return {
			filterBy: { destination: '', dates: '0', guests: null, amenities: [] },
			value1: 0,
			isSearchOpen: false,
			addGuestsMenu: false,
			dateMenu: false,
		};
	},
	created() {
		this.filterBy = this.$route.query;
		this.filterBy.guests = 'Add guests';
	},
	mounted() {
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
			this.dateMenu = !this.dateMenu;
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
	components: { Datepicker },
};
</script>
