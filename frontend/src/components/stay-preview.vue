<template>
	<section class="stay-preview flex col space">
		<!-- <article class="preview-card"> -->
		<div class="stay-images-container">
			<preview-carousel :urls="this.stay.imgUrls" />
		</div>
		<div class="preview-data flex col even">
			<div class="rating">⭐{{ avgRating }}  (<span>{{ reviewsCount }}</span> reviews)</div>
			<p>{{ stay.type }} in {{ stay.loc.city }}, {{ stay.loc.country }}</p>
			<p class="preview-stay-title">{{ stay.name }}</p>
			<p>
				<span class = "stay-price">${{ stay.price }}</span> /night
			</p>
		</div>
		<!-- </article> -->
		<div class="">
			<!-- <custom-label
            v-for="label in stay.labels"
            :key="label"
            :label="label"
          /> -->
		</div>
		<!-- <slot></slot> -->
	</section>
</template>

<script>
import PreviewCarousel from './preview-carousel.vue';

export default {
	name: 'stay-preview',
	props: {
		stay: Object,
	},
	data() {
		return {};
	},

	components: {
		PreviewCarousel,
		// customLabel,
	},
	computed: {
		avgRating() {
			let ratingSum = this.stay.reviews.reduce((acc, x) => acc + x.rate, 0);
			let avgRating = ratingSum / this.stay.reviews.length;
			return avgRating;
		},
		reviewsCount() {
			return this.stay.reviews.length;
		},
		imgUrls() {
			return this.stay.imgUrls;
		},
	},
};
</script>

// import customLabel from './custom-label.vue' // stay specifics needed on stay
card/preview- // imgs carousle // type in place // title : name //
max-cap,bedrooms, bed num , bath num \\ לא מופיע בתצוגה קטנה // amenities:
kitchen, free parking , Wifi \\ לא מופיע בתצוגה קטנה // avg rating (reviews
count) price + currency/night
