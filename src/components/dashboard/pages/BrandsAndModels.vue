<template>
  <section>
    <h2>
      Brand's and Model's
    </h2>
    <div>
      <h3>Add Brand</h3>
      <v-form @submit.prevent="addBrand({brand})">
        <v-text-field
          label="Brand"
          v-model="brand"
          required
        ></v-text-field>
        <v-btn type="submit">Add</v-btn>
      </v-form>
    </div>
    <hr>
    <div>
      <h2>Brands</h2>
      <ul>
        <li v-for="brand in brands" :key="brand.id">{{brand.name}}</li>
      </ul>
    </div>
  </section>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
export default {
  created () {
    this.$store.dispatch('loadBrands')
  },
  data () {
    return {
      brand: ''
    }
  },
  methods: mapActions({addBrand: 'createBrand'}),
  computed:{
    ...mapGetters({getBrand: 'brand'}),
    ...mapState({
      brands: state => state.BrandsAndModels.loadedBrands
    })
  },
  watch: {
    getBrand (value) {
      if (value !== null) {
        
      }
    }
  }
}
</script>

<style>

</style>
