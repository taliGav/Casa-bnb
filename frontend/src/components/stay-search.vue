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
        <div class="date-start" @click="showDatePicker">
          <span>Check in</span>
          <p>{{ startDate }}</p>
        </div>
        <div class="date-end" @click="showDatePicker">
          <span>Check out</span>
          <p>{{ endDate }}</p>
        </div>
        <div class="search-guests" @click="addGuests">
          <div class="guests-container">
            <span>Guests</span>
            <p v-if="!filterBy.guests">Add guests</p>
            <p v-else>{{ filterBy.guests }}</p>
          </div>

          <!-- </add-guests-count> -->
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
    <!-- <div id="picker"> -->
    <el-date-picker
      v-model="pickedDates"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
    />
    <!-- </div> -->
    <div class="relative">
      <add-guests-count
        v-if="addGuestsMenu"
        :guests="filterBy.guests"
        @addGuests="changeGuests"
      />
    </div>
  </div>
</template>

<script>
import addGuestsCount from './add-guests-count.vue';

export default {
	name: 'search',
	data() {
		return {
			isSearchOpen: false,
			addGuestsMenu: false,
			filterBy: {
				destination: '',
				guests: null,
			},
			pickedDates: null,
		};
	},
	created() {
		this.setFilter();
	},
	mounted() {
		window.addEventListener('click', this.clickCheck);
	},
	unmounted() {
		window.removeEventListener('click', this.clickCheck);
	},
	computed: {
		curFilterBy() {
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
		setFilter() {
			console.log('set search', this.curFilterBy);
			this.filterBy.destination = this.curFilterBy.destination;
			this.filterBy.guests = this.curFilterBy.guests;
		},
		doFilter() {
			this.$router.push({
				name: 'stay',
				query: {
					destination: this.filterBy.destination,
					guests: this.filterBy.guests,
				},
			});
		},
		showDatePicker() {
			this.$el.querySelector('.el-range-editor').click();
			// window.document.querySelector('.el-popper').classList.add('el-popper-search')
			console.log('date picker search-bar', this.startDate);
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
			// console.log('ev' , ev);
			// console.log('el' , el);
			// console.log('local',local)
			if (
				local === 'img' ||
				local === 'p' ||
				local === 'span' ||
				el === 'search-btn-container' ||
				el === 'search-container' ||
				el === 'search-input' ||
				el === 'date-start' ||
				el === 'date-end' ||
				el === 'guests-container' ||
				el === 'guests-input-modal flex aling just col space'||
				el === 'guests-details flex align just space'||
				el === ''
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
			if (!this.filterBy.guests) this.filterBy.guests = 0;
			if (typeof this.filterBy.guests === 'string')
				this.filterBy.guests = parseInt(this.filterBy.guests);
			if (num < 0 && this.filterBy.guests === 0) return;
			this.filterBy.guests += num;
		},
	},
	components: {
		addGuestsCount,
	},
};
</script>

<style>
.el-popper {
  top: 340px !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  position: fixed !important;
  /* top: 340px !important;
	left: 50% !important; */
}
</style>
