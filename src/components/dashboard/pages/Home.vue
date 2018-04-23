<template>
  <section>
    <h1>Dashboard</h1>
    <router-link :to="{name: 'dashboard'}">Home</router-link>
    <router-link :to="{name: 'brands_and_models'}">Brand's and Model's</router-link>
    <router-link :to="{name: 'vehicles'}">Vehicles</router-link>
    <router-link :to="{name: 'atributes'}">Atributes</router-link>
    <br>
    <hr>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  data () {
    return {
      dash: false
    }
  }
}
</script>

<style>

</style>
