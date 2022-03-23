<template>
  <form>
    <input v-model="filterBy.destination" type="text" placeholder="dest" />
    <input v-model="filterBy.guests" type="number" />
    <RouterLink
      :to="{
        name: 'stay',
        query: {
          destination: filterBy.destination,
          dates: filterBy.dates,
          guests: filterBy.guests,
        },
      }"
      >search</RouterLink
    >
  </form>
</template>
<script>
export default {
  name: 'search',
  data() {
    return {
      filterBy: { destination: '', dates: '0', guests: 0 }
    }
  },
  created() {
    
  },
  computed: {
    
  },
  methods: {
//    search(){
//     //  <button @click="$router.push('/stay')" class="btn btn-info">
//     //     explore now
//     //   </button>
//      this.$router.push(`/stay/${this.filterBy.destination}/${this.filterBy.dates}/${this.filterBy.guests}`)
//    }
  },
}
</script>