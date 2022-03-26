<template>
  <div class="price-modal slider-demo-block">
    <el-slider v-model="value" range show-stops :max="maxPrice" />
  </div>
  <div>{{ value[0] }}</div>
  <div>{{ value[1] }}</div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'stay-filter-price',
  props: {
    stays: Array,
  },
  data() {
    return {
      prices: this.stays.map(stay => stay.price),
      value : ref([0, 200]),
    }
  },
  created() {

  },
  watch: {
    },
  computed: {
    maxPrice(){
     return Math.max(...this.prices) 
    }
  },
  methods: {

  },
}
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
  width: 120px;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>