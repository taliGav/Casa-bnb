<template>
	<section>
		<div class="guests-input-modal flex aling just">
			<div class="guests-details flex align just space">
				<div>
					<span>Adults</span>
					<p>Ages 13 or above</p>
				</div>
				<div class="guests-buttons flex space">
					<button @click.stop.prevent="addAdult(-1)" class="btn-round">
						-
					</button>
					<div>{{ adults }}</div>
					<div v-if="!adults">0</div>
					<button @click.stop.prevent="addAdult(+1)" class="btn-round">
						+
					</button>
				</div>
			</div>
			<!-- <hr /> -->
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

		data() {
			return {
				adults: null,
				children: null,
				infants: null,
				totalGuests: this.guestsCount(),
			};
		},
		created(){
			this.adults = 0;
		}
	},
	methods: {
		guestsReservation() {
			// this.$emit('addGuests', this.totalGuests);
		},

		addAdult(num) {
			this.$emit('addGuests', num);
			// if (!this.adults) this.adults = null;
			this.adults += num;

			// if (!this.adults && num < 0) return;
			// if (!!this.adults) this.adults = 0;
			// console.log(this.adults);
			// // else
			// this.adults + num;

			// // console.log(num);
			// console.log(this.adults);
		},
	},

	computed: {
		// guestsCount() {
		// 	const sum = this.adults + this.children + this.infants;
		// 	return sum;
		// },
	},
	watch: {
		// totalGuests: 'guestsReservation',
	},
};
</script>
<style></style>
