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
    this.filterBy = this.curFilterBy
  },
  computed: {
    curFilterBy(){
      return this.$route.query
    }
  },
  methods: {
  },
}
</script>