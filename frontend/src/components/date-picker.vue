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
	emits:['orders'],
	name: 'date-picker',
	props: {
		isOpen: {
			type: Boolean,
		},
	},
	created() {
		// console.log(this.isOpen);
	},
	data() {
		return {
			orderDates: null,
		};
	},
	methods: {
		openCalender() {
			this.$el.querySelector('.el-range-editor').click();
			window.document
				.querySelector('.el-popper')
				.classList.add('el-popper-order');
		},
		sendOrderDates(){
			this.$emit('orders', this.orderDates)
		}
	},
	computed: {
		// checkOpen(){
		// 	if(this.isOpen) this.openCalender();
		// }
	},
	watch: {
		isOpen: 'openCalender',
		orderDates: 'sendOrderDates'
	},
	unmounted() {
		window.document
			.querySelector('.el-popper')
			.classList.remove('el-popper-order');
		// this.$emit('orderDates', this.orderDates);
	},
};
</script>
<style>
.el-popper-order {
	/* background-color: v-bind(redColor); */
	transform: translate(-50%, -50%) !important;
	position: absolute !important;
	/* top: v-bind(topPos) ; */
	/* left: v-bind(leftPos); */
	top: 100% !important;
	left: 66.5% !important;
}

.father {
	/* position: relative !important; */
}
</style>
