<template>
	<section class="mobile-search-bar-container" @click = 'openMobileSearch'>
        <div class="search-bar flex align just">
            <img src="../../assets/Images/logos/search-icon-red.svg" alt="" />
            <p>Where are you going?</p>
        </div>
    </section>
</template>
<script>
export default {
    name: 'mobile-search-bar', 

    data(){
        return{
            
        }
    },
    methods:{
        openMobileSearch(){ 
            console.log('hello')
        }
    }
};
</script>
<style></style>
