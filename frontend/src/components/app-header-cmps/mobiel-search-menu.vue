<template>
	<section class="mobile-search-menu flex col align">
		<div class="mobile-search-container flex just align">
			<div class="back-button flex align just" @click="closeMobileMenu">
				<img src="../../assets/Images/logos/back-button.svg" alt="" />
			</div>
			<input
				type="text"
				class="mobile-search-input"
				placeholder="Where are you going?"
				@change="setFilter"
				v-model="filterBy.destination"
			/>
		</div>
		<div class="mobile-filters">
			<div class="mobile-guests-count flex align just">
				<div class="mobile-date-start flex" @click="showDatePicker">
					<span>Check in</span>
					<p>{{ startDate }}</p>
				</div>
				<!-- <date-picker :mobileOpen = "datePickerMenu"></date-picker> -->
				<!-- <el-date-picker
					v-model="pickedDates"
					type="daterange"
					range-separator="To"
					start-placeholder="Start date"
					end-placeholder="End date"
				/> -->
				<div class="guests-father relative" v-if="addGuestsMenu">
					<add-guests-count
						@addGuests="changeGuests"
						class="mobile-add-guests"
					></add-guests-count>
				</div>
				<div class="mobile-date-end" @click="showDatePicker">
					<span>Check out</span>
					<p>{{ endDate }}</p>
				</div>
				<div class="mobile-search-guests" @click="addGuests">
					<div class="guests-container">
						<span>Guests</span>
						<p v-if="!filterBy.guests">Add guests</p>
						<p v-else>{{ filterBy.guests }}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import addGuestsCount from '../add-guests-count.vue';
import datePicker from '../date-picker.vue';
export default {
	data() {
		return {
			filterBy: {
				destination: '',
				guests: null,
			},
			pickedDates: null,
			addGuestsMenu: null,
			datePickerMenu: false,
			pickedDates: null,
		};
	},
	methods: {
		showDatePicker() {
			this.$el.querySelector('.el-range-editor').click();
		},
			openMobileCalender() {
			console.log('opening mobile', this.mobileOpen);
			this.$el.querySelector('.el-range-editor').click();
			window.document
				.querySelector('.el-popper')
				.classList.add('el-popper-mobile');
			window.document
				.querySelector('.el-picker-panel')
				.classList.add('el-picker-panel-mobile');
		},
			closeMobileCalender() {
			console.log('closing');
			window.document
				.querySelector('.el-popper')
				.classList.remove('el-popper-mobile');
			window.document
				.querySelector('.el-picker-panel')
				.classList.remove('el-picker-panel-mobile');
			window.document
				.querySelector('.el-popper')
				.classList.remove('el-popper-order');
		},
		closeMobileMenu() {
			this.$emit('closeMobileMenu');
		},
		setFilter() {
			console.log('filter', this.filterBy.destination);
		},
		changeGuests() {
			console.log('changing');
		},
		addGuests() {
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
	computed: {
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
	components: {
		addGuestsCount,
		datePicker,
	},
};
</script>
<style></style>

// openCalender() { // var d = window.document.querySelector('.el-popper'); //
var container = this.$el.querySelector('#date-container'); // console.log('date
picker:', d, container); // container.append(d); // this.isCalendar =
!this.isCalendar; // },
