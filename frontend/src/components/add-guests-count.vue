<template>
	<section>
		<div class="guests-input-modal flex aling just col ">
			<div class="guests-details flex align just space border-bot">
				<div>
					<span>Adults</span>
					<p>Ages 13 or above</p>
				</div>
				<div class="guests-buttons flex space">
					<!-- <div class = "guests-bottom-border"></div> -->
					<button @click.stop.prevent="addAdult(-1)" class="btn-round">
						-
					</button>
					<div class="flex align just">{{ adults }}</div>
					<!-- <div v-if="!adults">0</div> -->
					<button @click.stop.prevent="addAdult(+1)" class="btn-round">
						+
					</button>
				</div>
			</div>
			<!-- <hr /> -->
			<div class="guests-details flex align just space border-bot margin-top">

					<!-- <div class = "guests-bottom-border"></div> -->
				<div>
					<span>Children</span>
					<p>Ages 2-12</p>
				</div>
				<div class="guests-buttons flex space ">
					<button @click.stop.prevent="addChild(-1)" class="btn-round">
						-
					</button>
					<div class="flex align just">{{ children }}</div>
					<!-- <div v-if="!adults">0</div> -->
					<button @click.stop.prevent="addChild(+1)" class="btn-round">
						+
					</button>
				</div>
			</div>
			<!-- <hr /> -->
			<div class="guests-details flex align just space margin-top">
				<div>
					<span>Infants</span>
					<p>Under 2</p>
				</div>
				<div class="guests-buttons flex space">
					<button @click.stop.prevent="addInfant(-1)" class="btn-round">
						-
					</button>
					<div class="flex align just">{{ infants }}</div>
					<!-- <div v-if="!adults">0</div> -->
					<button @click.stop.prevent="addInfant(+1)" class="btn-round">
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
	},
	data() {
		return {
			adults: null,
			children: null,
			infants: null,

			// totalGuests: this.guestsCount(),
		};
	},
	created() {
		this.adults = 1;
		this.children = 0;
		this.infants = 0;
	},

	methods: {
		guestsReservation() {
			// this.$emit('addGuests', this.totalGuests);
		},

		addAdult(num) {
			this.$emit('addGuests', num);
			if (this.adults < 1 && num < 0) return;
			this.adults += num;
		},
		addChild(num) {
			this.$emit('addGuests', num);
			if (this.children < 1 && num < 0) return;
			this.children += num;
		},
		addInfant(num) {
			this.$emit('addGuests', num);
			if (this.infants < 1 && num < 0) return;
			this.infants += num;
		},
	},

	computed: {},
	watch: {},
};
</script>
<style></style>
