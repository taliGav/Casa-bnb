<template>
	<section>
		<div class="guests-input-modal flex around align">
			<button @click.stop.prevent="changeGuests(-1)" class="btn-round">
				-
			</button>
			<!-- <div>{{ filterBy.guests }}</div> -->
			<button @click.stop.prevent="changeGuests(+1)" class="btn-round">
				+
			</button>
		</div>
	</section>
</template>
<script>
export default {
	name: 'add-guests-count',
	props: {
		guests: {
			type: Number,
		},
	},
	methods: {
		changeGuests(num) {
			this.$emit('addGuests', num);
		},
	},
};
</script>
<style></style>
