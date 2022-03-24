<template>
	<!-- <div> -->
	<Datepicker v-model="date" range multiCalendars multiCalendarsSolo />
	<!-- </div> -->
</template>
<script>
import { ref, onMounted } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
	setup() {
		const date = ref();

		onMounted(() => {
			const startDate = new Date();
			const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
			date.value = [startDate, endDate];
		});

		return {
			date,
		}
	},
    components: { Datepicker },
};
</script>
<style></style>
