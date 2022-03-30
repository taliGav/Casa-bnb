<template>
<section class = "main-layout full">

	<footer class="main-footer">
		<p>&copy; CaJan22</p>
	</footer>
  <mobile-footer></mobile-footer>
</section>
</template>
<script>
import mobileFooter from './mobile-footer.vue';
export default {
	name: 'app-footer',
	components: {
		mobileFooter,
	},
};
</script>
