<template>
	<div class="reservation-confirm-modal flex col align just">
		<!-- <div  @click="goBack">Back</button> -->
		<img
			class="closing-icon"
			src="../../assets/icons/x-close.png"
			@click="goBack"
			alt=""
		/>
		<div v-if="orderStage" class="flex col just align">
			<div class="reservations-confirm-info flex just col">
				<h3>Reservation summary</h3>
				<h4> {{ order.stay.name }}</h4>
				<p><span>Check in </span> {{ startDate }}</p>
				<p><span>Check out </span> {{ endDate }}</p>
				<p><span>Total price </span>{{ toTotalPrice }}</p>
			</div>
			<!-- <pre>{{order}}</pre> -->
			<!-- <div class="flex space"> -->
			<button class="red-btn confirm-btn" @click="confirmReservation">
				Confirm
			</button>
			<!-- </div> -->
		</div>
		<img
			v-if="isLoading"
			class="loading-icon"
			src="../../assets/icons/circle-red.gif"
		/>
		<div v-if="isComplete" class="flex col align just">
			<h3>Success</h3>
			<p>Your order was sent to the host for confirmation</p>
			<button class="red-btn" @click="goBack">Continue</button>
		</div>

		<!-- <h3 v-if="isComplete">DONE!</h3> -->
	</div>
</template>
<script>
export default {
	props: {
		order: {
			type: Object,
		},
	},
	components: {},
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
			this.$emit('confirmReservation');
			// console.log('confirming');
			setTimeout(() => {
				this.isLoading = false;
				this.isComplete = true;
			}, 1000);
		},
		goBack() {
			this.$emit('closeConfirmationModal');
			this.isComplete = false;
		},
		toFixedPrice(price) {
			const options = {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 0,
			};
			const numberFormat = new Intl.NumberFormat('en-US', options);
			return numberFormat.format(price);
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
		toTotalPrice() {
			const options = {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 0,
			};
			const numberFormat = new Intl.NumberFormat('en-US', options);
			return numberFormat.format(this.order.totalPrice);
		},
	},
};
</script>
<style></style>
