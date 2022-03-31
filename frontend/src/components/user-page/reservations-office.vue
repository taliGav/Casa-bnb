<template>
  <div>
    <img v-if="isLoading" src="./../assets/img-upload-func/spin-load.gif" />
    <div v-else-if="orders" class="reservations-container main-app top-pad">
      <div class="container main-layout">
        <div class="container main-layout">
          <div class="table-container">
            <h2>Upcoming Reservations</h2>
            <ul class="responsive-table">
              <li class="table-header">
                <div class="col col-1">Status</div>
                <div class="col col-2">Details</div>
                <div class="col col-3">Guest</div>
                <div class="col col-4">Actions</div>
              </li>

              <reservations-table
                v-for="order in orders"
                :key="order._id"
                :order="order"
                @changeStatus="changeStatus($event, order)"
              ></reservations-table>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import reservationsTable from "./reservations-table.vue";
export default {
  name: "reservations-office",
  data() {
    return {
      isLoading: false,
      user: null,
      orders: null,
    };
  },
  async created() {
    this.user = this.loggedUser;
    this.isLoading = true;
    await this.$store.dispatch({
      type: "getOrders",
      filterBy: { _id: this.user._id },
    });
    this.orders = this.ordersToShow;
    socketService.emit("topic", this.user._id);
    socketService.on("add order", this.addOrder);
    this.isLoading = false;
  },
  destroyed() {
    socketService.off("add order", this.addOrder);
  },
  methods: {
    changeStatus(status, order) {
      var orderToSave = JSON.parse(JSON.stringify(order));
      orderToSave.status = status;
      this.$store.dispatch({ type: "addOrder", order: orderToSave });
    },
    addOrder(order) {
      console.log("socket add order", order);
      this.$store.commit({ type: "addOrder", order });
    },
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
  },
};
</script>
<style></style>
