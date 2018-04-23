<template>
  <section>
    <h1>Dashboard</h1>
    <router-link :to="{name: 'dashboard'}">Home</router-link>
    <div v-if="!auth">
      <router-link :to="{name: 'signup'}">Sign Up</router-link>
    </div>
    <div else>
      <router-link :to="{name: 'brands_and_models'}">Brand's and Model's</router-link>
      <router-link :to="{name: 'vehicles'}">Vehicles</router-link>
      <router-link :to="{name: 'atributes'}">Atributes</router-link>
    </div>
    <br>
    <hr>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
}
</script>

<style>

</style>
