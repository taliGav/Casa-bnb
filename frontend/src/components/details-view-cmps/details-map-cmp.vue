<template>
	<div class="stay-details-map flex justify-content align-items main-app">
		<GMapMap
			:center="center"
			:zoom="14"
			map-type-id="terrain"
			style="width: 100vw; height: 20rem"
		>
			<GMapMarker
				:key="index"
				v-for="(m, index) in markers"
				:position="m.position"
				:clickable="true"
				:draggable="true"
				@click="openMarker(m.id)"
			>
				<GMapInfoWindow
					:closeclick="true"
					@closeclick="openMarker(null)"
					:opened="openedMarkerID === m.id"
				>
					<div>I am in info window {{ m.id }}</div>
				</GMapInfoWindow>
			</GMapMarker>
		</GMapMap>
	</div>

	<!-- <h3>Our Shops Locations</h3> -->
	<!-- <div class="cities flex align-items justify-content space">
		<div class="city-box" @click="moveTo({ lat: 32.0853, lng: 34.7818 })">
			Tel-Aviv
		</div>
		<div class="city-box" @click="moveTo({ lat: 32.1624, lng: 34.8447 })">
			Herzeliya
		</div>
		<div class="city-box" @click="moveTo({ lat: 32.1848, lng: 34.8713 })">
			Raanana
		</div>
	</div> -->
</template>

<script>
export default {
	name: 'stay-details-map',
	props: {
		stay: Object,
	},
	data() {
		return {
			openedMarkerID: null,
			center: { lat: 31.7683, lng: 35.2137 },
			markers: [
				{
					id: 1,
					position: {
						lat: 32.0853,
						lng: 34.7818,
					},
				},
				{
					id: 2,
					position: {
						lat: 32.1624,
						lng: 34.8447,
					},
				},
				{
					id: 3,
					position: {
						lat: 32.1848,
						lng: 34.8713,
					},
				},
			],
		};
	},
	methods: {
		openMarker(id) {
			this.openedMarkerID = id;
		},
		moveTo(cords) {
			this.center = cords;
		},
	},
};
</script>

<style></style>
