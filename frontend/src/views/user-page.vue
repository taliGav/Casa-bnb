<template>
  <div class="reservations-container main-app top-pad-small">
    <reservations-office />
    <!-- <add-stay /> -->
  </div>
</template>
<script>
import reservationsOffice from '../components/user-page/reservations-office.vue';
import addStay from '../components/user-page/add-stay.vue';
export default {
	name: 'user-page',
	data() {
		return {
			// user: null,
			// orders: null,
		};
	},
	async created() {
		// this.user = this.loggedUser;
		// // console.log(this.user);
		// await this.$store.dispatch({
		// 	type: 'getOrders',
		// 	filterBy: { _id: this.user._id },
		// });
		// this.orders = this.ordersToShow;
		// console.log(this.orders);
	},
	methods: {
		// changeStatus(status,order){
		// 	var orderToSave = JSON.parse(JSON.stringify(order));
		// 	orderToSave.status = status;
		// 	console.log('cmp:',order._id);
		// 	this.$store.dispatch({ type: 'addOrder', order: orderToSave})

		// }
	},
	computed: {
		// loggedUser() {
		// 	return this.$store.getters.user;
		// },
		// ordersToShow() {
		// 	return this.$store.getters.orders;
		// },
		// buyer() {
			
		// }
	},
	components: {
		reservationsOffice,
		addStay
	},
};
</script>
<style></style>
