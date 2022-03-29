<template>
	<!-- <div> -->
	<section>
		<li class="table-row" v-if="order">
			<div class="col col-1">
				<p>Check in-{{ startDate }}</p>

				<p>Check out-{{ endDate }}</p>
			</div>
			<div class="col col-2">
				<p>{{ order.buyer.fullname }}</p>
			</div>
			<div class="col col-3">${{ order.totalPrice }}</div>
			<div class="col col-4" :style="status">{{ order.status }}</div>
		</li>
	</section>
	<!-- </div> -->
</template>
<script>
export default {
	name: 'reservation-table-li',
	props: {
		order: {
			type: Object,
		},
	},
	created() {
		console.log(this.order);
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
		status() {
			if (this.order.status === 'pending') return { color: 'orange' };
			if (this.order.status === 'confirmed') return { color: 'green' };
			if (this.order.status === 'canceled') return { color: 'red' };
		},
	},
};
</script>
<style></style>
