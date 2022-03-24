<template>
	<section class="carousel">
		<el-carousel
			:autoplay="false"
      indicator-position = "none"
			:interval="2000"
			height="200px"
			width="100%"
			arrow="hover"
			class="img-container"
		>
			<el-carousel-item v-for="(url, idx) in urls" :key="idx">
				<img :src="url" class="img-in-card" alt="" />
			</el-carousel-item>
		</el-carousel>
	</section>
</template>

<script>
export default {
	name: 'carousel',
	props: {
		urls: Array,
	},

	data() {
		return {};
	},
	created() {
	
	},

	computed: {
	
	},
	methods:{

	}
};
</script>

<style scoped>

</style>
