<template>
	<div class="reservation-confirm-modal flex col align just">
		<div v-if="orderStage" class="flex col just align">
			<div class="reservations-confirm-info flex just col">
				<h3>Reservation Details</h3>
				<p><span>Stay </span> {{ order.stay.name }}</p>
				<p><span>Check in </span> {{ startDate }}</p>
				<p><span>Check out </span> {{ endDate }}</p>
				<p><span>Total price </span> {{ order.totalPrice }}</p>
			</div>
			<!-- <pre>{{order}}</pre> -->
			<div class="flex space">
				<button class="confirm-btn" @click="confirmReservation">Confirm</button>
				<button @click="goBack">Back</button>
			</div>
		</div>
		<img
			v-if="isLoading"
			class="loading-icon"
			src="../../assets/icons/circle-red.gif"
			alt=""
		/>
		<h3 v-if="isComplete">DONE!</h3>
	</div>
</template>
<script>
export default {
	props: {
		order: {
			type: Object,
		},
	},
	name: 'reservation-confirm-modal',
	data() {
		return {
			isLoading: false,
			isComplete: false,

			// startDate: this.order.startDate.substring(1,10)
		};
	},
	created() {
		// console.log(order);
	},
	methods: {
		confirmReservation() {
			this.isLoading = true;

			// console.log('confirming');
			setTimeout(() => {
				this.isLoading = false;
				this.isComplete = true;
			}, 1000);
			setTimeout(() => {
				this.$emit('confirmReservation');
			}, 1500);
			setTimeout(() => {
				this.isComplete = false;
			}, 1700);
		},
		goBack() {
			this.$emit('closeConfirmationModal');
		},
	},
	computed: {
		startDate() {
			var dateObject = new Date(this.order.startDate);
			const humanDateFormat =
				dateObject.getDate() +
				'/' +
				(dateObject.getMonth() + 1) +
				'/' +
				dateObject.getFullYear();
			return humanDateFormat;
		},
		endDate() {
			var dateObject = new Date(this.order.endDate);
			const humanDateFormat =
				dateObject.getDate() +
				'/' +
				(dateObject.getMonth() + 1) +
				'/' +
				dateObject.getFullYear();
			return humanDateFormat;
		},
		orderStage() {
			if (this.isLoading || this.isComplete) return false;
			else return true;
		},
	},
};
</script>
<style></style>

const order = { hostId: this.stay.host._id, // buyerId: this.loggedUser._id,
createdAt: Date.now(), buyer: { _id: this.loggedUser._id, fullname:
this.loggedUser.fullname, imgUrl: this.loggedUser.imgUrl, }, // stayId:
this.stay._id, stay: { _id: this.stay._id, name: this.stay.name, price:
this.stay.price, }, guests: this.guestsCount, startDate:
this.resirvationDates[0], endDate: this.resirvationDates[1], totalPrice: days *
this.stay.price, };
