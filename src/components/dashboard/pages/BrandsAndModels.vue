<template>
  <section>
    <h2>
      Brand's and Model's
    </h2>
    <hr>
    <div>
      <h2>Brands</h2>
      <ul>
        <li v-for="brand in brands" :key="brand.id">
          {{brand.name}} - 
          <button @click="editBrand({'id': brand.id, 'name': brand.name, 'type': 'edit'})">Edit</button>
          <button @click="editBrand({'id': brand.id, 'name': brand.name, 'type': 'delete'})">Delete</button>
        </li>
        <button @click="newBrandModal = true">Add Brand</button>
      </ul>
    </div>
    <v-layout row justify-center>
      <v-dialog v-model="newBrandModal" persistent max-width="390" lazy>
        <v-card xs12>
          <v-card-title class="headline">New Brand</v-card-title>
          <v-form>
            <v-text-field
              label="Brand"
              v-model="brand"
              required
            ></v-text-field>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click.native="newBrandModal = false">Cancel</v-btn>
            <v-btn color="blue darken-1" type="submit" @click="addBrand({brand})">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="editBrandModal" persistent max-width="390">
        <v-card xs12>
          <v-card-title class="headline">Edit Brand</v-card-title>
          <v-form>
            <v-text-field
              label="Brand"
              v-model="brand"
              required
            ></v-text-field>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click.native="editBrandModal = false">Cancel</v-btn>
            <v-btn color="blue darken-1" type="submit" @click="saveBrand({'name': brand, 'id':brandId})">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="deleteBrandModal" persistent max-width="390">
        <v-card xs12>
          <v-card-title class="headline">Delete Brand</v-card-title>
            <h4>Are you sure that you wanna delete Brand "{{brand.toUpperCase()}}"</h4>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="gray darken-1" flat @click.native="deleteBrandModal = false">Cancel</v-btn>
            <v-btn color="red darken-4" type="submit" @click="deleteBrand(brandId)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  created () {
    this.fecthData()
  },
  data () {
    return {
      brand: '',
      brandId: '',
      newBrandModal: false,
      editBrandModal: false,
      deleteBrandModal: false
    }
  },
  methods: {
    ...mapActions({addBrand: 'createBrand', deleteBrand: 'removeBrand', saveBrand: 'updateBrand'}),
    editBrand (data) {
      if (data.type === 'edit') {
        this.editBrandModal = true
      } else {
        this.deleteBrandModal = true
      }
      this.brandId = data.id
      this.brand = data.name
    },
    fecthData () {
      this.$store.dispatch('loadBrands')
    }
  },
  computed: {
    ...mapState({
      brands: state => state.BrandsAndModels.loadedBrands
    })
  },
  updated () {
    this.fecthData()
  }
}
</script>

<style>

</style>
