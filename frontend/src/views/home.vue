<template>
  <section class="home flex flex-col gap-2 items-center justify-center">
    <div class="info text-center flex flex-col gap-3 items-star">
      <div>
        <h1>Welcome to my stay shop</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <button @click="$router.push('/stay')" class="btn btn-info">
        explore now
      </button>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style></style>
