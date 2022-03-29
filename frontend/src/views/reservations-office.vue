<template>
	<div v-if="orders" class="reservations-container main-app top-pad">
		<div class="container main-layout">
			<h2>Your Reservations</h2>
			<ul class="responsive-table">
				<li class="table-header">
					<div class="col col-1">Dates and Location</div>
					<div class="col col-2">Guest</div>
					<div class="col col-3">Total Price</div>
					<div class="col col-4">Status</div>
				</li>
				
				<reservations-table
					v-for="order in orders"
					:key="order._id"
					:order="order"
				></reservations-table>
				
			</ul>
			<!-- <pre>{{ orders }}</pre> -->
		</div>
	</div>
</template>

<script>
import reservationsTable from '../components/reservations-table.vue';
export default {
	name: 'reservations-list',
	data() {
		return {
			user: null,
			orders: null,
		};
	},
	async created() {
		this.user = this.loggedUser;
		// console.log(this.user);
		await this.$store.dispatch({
			type: 'getOrders',
			filterBy: { _id: this.user._id },
		});
		this.orders = this.ordersToShow;
		console.log(this.orders);
	},
	methods: {},
	computed: {
		loggedUser() {
			return this.$store.getters.user;
		},
		ordersToShow() {
			return this.$store.getters.orders;
		},
	},
	components: {
		reservationsTable,
	},
};
</script>
<style></style>
