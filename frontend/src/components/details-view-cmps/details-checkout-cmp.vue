<template>
	<section v-if="stay" class="details-checkout">
		<div class="checkout-modal">
			<div class="price-and-rate flex space">
				<div class="price-per-night">
					<span class="price">${{ stay.price }}</span>
					<span class="night">/night</span>
				</div>
				<ratings-reviews :stay="stay" />
			</div>
			<div class="dates-guests">
				<div class="dates flex space" @click="openCalender">
					<div class="check-in-container flex col align just">
						<div class="check-in-title title">CHECK-IN</div>
						<div class="check-in-value">
							<p>{{ startDate }}</p>
						</div>
					</div>
					<div class="check-out-container">
						<div class="check-out-title title">CHECKOUT</div>
						<div class="check-out-value">
							<p>{{ endDate }}</p>
						</div>
					</div>
				</div>
				<div class="guests flex space" @click.stop.prevent="openGuestsMenu">
					<div class="guests-container">
						<div class="guests-title title">GUESTS</div>
						<div class="guests-value flex">
							<p>{{ guestsCount }} &ensp;</p>
							<p v-if="guestsNumber">guest</p>
							<p v-else>guests</p>
						</div>
					</div>
					<div class="calender-checkout-container">
						<date-picker
							:isOpen="isCalendar"
							@orders="orderDates"
						></date-picker>
						<div class="relative">
							<add-guests-count
								v-if="openGuests"
								@guests="guests"
								@addGuests="addGuests"
							></add-guests-count>
						</div>
					</div>
				</div>
			</div>
			<div class="reserve-btn-cmp">
				<reserve-btn @click="makeReservation" />
			</div>
		</div>
	</section>
</template>

<script>
import datePicker from '../date-picker.vue';
import ratingsReviews from './../reusable-cmps/ratings-reviews-cmp.vue';
import reserveBtn from './../reusable-cmps/reserve-btn-cmp.vue';
import addGuestsCount from '../add-guests-count.vue';

export default {
	components: {
		ratingsReviews,
		reserveBtn,
		datePicker,
		addGuestsCount,
	},
	name: 'details-checkout',
	props: {
		stay: Object,
	},
	data() {
		return {
			guestsCount: 1,
			isCalendar: false,
			resirvationDates: null,
			openGuests: false,
			loggedUser: null,
		};
	},
	created() {
		window.addEventListener('click', this.closeGuests);
		this.loggedUser = this.checkLoggedUser;
	},
	computed: {
		startDate() {
			if (this.resirvationDates) {
				const startDate = new Date(this.resirvationDates[0]);
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
			if (this.resirvationDates) {
				const endDate = new Date(this.resirvationDates[1]);
				return (
					new Intl.DateTimeFormat('en-US', { month: 'long' }).format(endDate) +
					' ' +
					endDate.getDate()
				);
			} else {
				return 'Add dates';
			}
		},
		guestsNumber() {
			return this.guestsCount > 1 ? false : true;
		},
		checkLoggedUser() {
			const user = this.$store.getters.user;
			if (user) return user;
			// return
		},
	},
	methods: {
		makeReservation() {
			const timeDelta =
				new Date(`${this.resirvationDates[1]}`).getTime() -
				new Date(`${this.resirvationDates[0]}`).getTime();
			const days = Math.floor(timeDelta / 86400000);

			const order = {
				hostId: this.stay.host._id,
				buyerId: this.loggedUser._id,
				stayId: this.stay._id,
				guests: this.guestsCount,
				startDate: this.resirvationDates[0],
				endDate: this.resirvationDates[1],
				totalPrice: days * this.stay.price,
			};
			this.$store.dispatch({ type: 'addOrder', order });
			console.log('makin reservations', order);

			// var days = Math.floor(delta / 86400);
		},
		addGuests(guest) {
			// if (!guestsCount) this.guestsCount = 1;
			if (this.guestsCount < 1.5 && guest < 0) return;
			if (this.guestsCount === this.stay.capacity && guest > 0) return;

			this.guestsCount += guest;
			// console.log(guest);
		},
		openCalender() {
			this.isCalendar = !this.isCalendar;
		},
		orderDates(dates) {
			this.resirvationDates = dates;
			console.log(dates);
		},
		openGuestsMenu() {
			this.openGuests = true;
		},
		closeGuests(ev) {
			const el = ev.target.className;
			if (
				el !== 'guests-input-modal flex aling just col space' ||
				el !== 'guests-details flex align just space'
			) {
				this.openGuests = false;
			} else {
				return;
			}
		},
	},
};
</script>

<style>
.calender-checkout-container {
	/* position: relative; */
}
</style>
