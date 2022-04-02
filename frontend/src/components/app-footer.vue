<template>
	<section class="main-layout full">
		<footer class="main-footer flex space">
			<div class="left-footer-container flex space">
				<div>
					<p>© 2022 Casabnb, Inc.</p>
				</div>
				<div>
					<p>· Privacy</p>
				</div>
				<div>
					<p>· Terms</p>
				</div>
				<div>
					<p>· Sitemap</p>
				</div>
			</div>

			<div class="right-footer-container">
				
			</div>
		</footer>
		<mobile-footer :screenSize="screenSize"></mobile-footer>
		<!-- <pre>{{screenSize}}</pre> -->
	</section>
</template>
<script>
import mobileFooter from './mobile-footer.vue';
export default {
	name: 'app-footer',
	props: {
		screenSize: {
			type: Object,
		},
	},
	computed: {
		screenStatus() {},
	},
	components: {
		mobileFooter,
	},
};
</script>
