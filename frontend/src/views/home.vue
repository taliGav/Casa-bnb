<template>
  <section class="home flex col main-app">
    <div class="info">
      <div>
        <h1>Welcome to my stay shop</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <stay-search />
      </div>
      <button @click="$router.push('/stay')" class="btn btn-info">
        explore now
      </button>
    </div>
  </section>
</template>

<script>
import staySearch from '../components/stay-search.vue'
export default {
  name: 'home',
  data() {
    return {
    }
  },
  created() {
    
  },
  computed: {
    
  },
  methods: {

  },
  components: {
    staySearch
  },
}
</script>

<style></style>
