<template>
	<section class="main-layout full">
		<footer class="main-footer">
			<p>&copy; CaJan22</p>
		</footer>
		<mobile-footer :screenSize = "screenSize"></mobile-footer>
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
	computed:{
		screenStatus(){
			
		}
	},
	components: {
		mobileFooter,
	},
};
</script>
