<template>
  <div>
    <!-- <img v-if="isLoading" src="../../assets/img-upload-func/Spin-load.gif" /> -->
    <div v-if="orders" class="reservations-container main-app top-pad-small">
      <!-- <div class="container main-layout"> -->
      <div class="table-container">
        <div class="header-container flex align">
          <h2 class="table-title">Upcoming Reservations</h2>
        </div>
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-1">STATUS</div>
            <div class="col col-2">DETAILS</div>
            <div class="col col-3">GUEST</div>
            <div class="col col-4">ACTIONS</div>
          </li>

          <reservations-table
            v-for="order in orders"
            :key="order._id"
            :order="order"
            :user="user"
            @changeStatus="changeStatus($event, order)"
            @setTopic="openChat"
          ></reservations-table>
        </ul>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import reservationsTable from './reservations-table.vue';
import chatModal from '../chat/chat-modal.vue';
export default {
	name: 'reservations-office',
	data() {
		return {
			isLoading: true,
			user: null,
			orders: null,
		};
	},
	async created() {
		this.user = this.loggedUser;
		await this.$store.dispatch({
			type: 'getOrders',
			filterBy: { _id: this.user._id },
		});
		this.orders = this.ordersToShow;
		this.isLoading = false;
		socketService.emit('topic', this.user._id);
		socketService.on('add order', this.addOrder);
	},
	destroyed() {
		socketService.off('add order', this.addOrder);
	},
	methods: {
		changeStatus(status, order) {
			var orderToSave = JSON.parse(JSON.stringify(order));
			orderToSave.status = status;
			this.$store.dispatch({ type: 'addOrder', order: orderToSave });
		},
		addOrder(order) {
			console.log('socket add order', order);
			this.$store.commit({ type: 'addOrder', order });
		},
		// openChat(topic) {
		// 	console.log('open chat, topic:', topic);
		// 	this.topic = topic;
		// 	this.isChatOpen = true;
		// },
	},
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
		chatModal,
	},
};
</script>
<style></style>
