<template>
	<section>
		<div class="btn-container">
			<div class="cell" v-for="i in 100" :key="i"></div>
			<div class="content">
				<button class="action-btn">
					<span>Check availability</span>
				</button>
			</div>
		</div>
	</section>
</template>

<script>
export default{
	name: 'reserve-btn'
}
</script>
