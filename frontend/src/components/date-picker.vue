<template>
	<div>
		<el-date-picker
			class="father"
			v-model="orderDates"
			type="daterange"
			range-separator="To"
			start-placeholder="Start date"
			end-placeholder="End date"
		/>
	</div>
</template>
<script>
export default {
	emits: ['orders'],
	name: 'date-picker',
	props: {
		isOpen: {
			type: Boolean,
		},
	},
	created() {},
	data() {
		return {
			orderDates: null,
		};
	},
	methods: {
		openCalender() {
			console.log('opening form check out', this.isOpen);
			this.$el.querySelector('.el-range-editor').click();
			window.document
				.querySelector('.el-popper')
				.classList.add('el-popper-order');
		},
		sendOrderDates() {
			this.$emit('orders', this.orderDates);
		},
	
	
	},
	computed: {},
	watch: {
		isOpen: 'openCalender',
		orderDates: 'sendOrderDates',
	},
};
</script>
<style></style>
