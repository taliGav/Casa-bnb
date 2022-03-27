<template>
	<section>
		<div class="guests-input-modal flex col even align">
            
            <div class = "guests-container flex ">
            <div class = "guests-details flex col">
                <span>Adults</span>
                <p>Ages 13 or above</p>
            </div>
			<div class = "guests-buttons flex">
				<button @click.stop.prevent="changeGuests(-1)" class="btn-round">
					-
				</button>
				<div>1</div>
				<button @click.stop.prevent="changeGuests(+1)" class="btn-round">
					+
				</button>
			</div>
            </div>
            <hr>
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
