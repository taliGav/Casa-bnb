<template>
	<div class="amenity flex">
        <img :src="amenetieImage" alt="">
		<p>{{ amenity }}</p>
        <pre v-if = "amenitiesImgs">{{amenetiesImg}}</pre>
	</div>
</template>
<script>

import { isThisQuarter } from 'date-fns';
import { stayService } from '../../services/stay-service.js';
export default {
	props: {
		amenity: {
			type: String,
		},
	},
    data(){
        return{
            amenetiesImgs:null,
            imgToShow: null,
        }
    },
    created(){
        this.amenetiesImgs = stayService.getAmenities()
        console.log('images',this.amenetiesImgs);
        this.imgToShow = this.amenetiesImgs.find((toShow) => toShow.svg === this.amenity)
        console.log(this.amenity);
        console.log('image to show',this.imgToShow);
    },
    computed:{
        // amenitiesImage(){
        //     const amenetieToShow = this.amenetiesImgs.find(toShow => toShow.name === this.amenetie);
        //     console.log(amenetieToShow);
        //     return amenetieToShow.svg
        // }
    }
};
</script>
<style></style>
