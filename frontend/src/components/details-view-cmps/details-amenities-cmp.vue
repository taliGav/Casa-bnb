<template>
	<div class="amenitie flex">
        <!-- <img src="" alt=""> -->
		<p>{{ amenitie }}</p>
        <pre v-if = "amenitiesImgs">{{amenetiesImg}}</pre>
	</div>
</template>
<script>

import { isThisQuarter } from 'date-fns';
import { stayService } from '../../services/stay-service.js';
export default {
	props: {
		amenitie: {
			type: String,
		},
	},
    data(){
        return{
            amenetiesImgs:null
        }
    },
    created(){
        this.amenetiesImgs = stayService.getAmenities()
        console.log(this.amenetiesImgs);
    },
    computed:{
        // amenitiesImages(){
        //     const img = this.amenetiesImgs.find(img => img.name === this.amenitie);
        //     console.log(img);
        // }
    }
};
</script>
<style></style>
