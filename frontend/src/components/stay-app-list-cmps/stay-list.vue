<template>

	<section class="main-app ">
		<!-- <div class="filter-count">{{ stays.count }} results found <span v-if=""> 
      in {{ filterBy.location }}</span></div> -->

		<!-- <div class="stays-count"> -->
		<!-- </div> -->
		<div class="stay-list-container">
			<p class="stays-to-show">Found {{ staysToShow }} stays</p>
			<ul class="stay-list">
				<li
					v-for="stay in stays"
					:key="stay._id"
					@click="$router.push(`/stay/${stay._id}`)"
				>
					<stay-preview v-if="stay" :stay="stay" />
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import stayPreview from './stay-preview.vue';

export default {
	name: 'stay-list',
	props: {
		stays: Array,
	},
	components: {
		stayPreview,
	},
	computed: {
		staysToShow() {
			return this.stays.length;
		},
		getImamge(path) {
			return;
		},
	},
};
</script>
