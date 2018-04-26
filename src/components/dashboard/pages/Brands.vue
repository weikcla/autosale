<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12>
        <div>
          <v-dialog v-model="dialog" max-width="500px">
            <v-btn color="primary" dark slot="activator" class="mb-2">New Brand</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field label="Brand name" v-model="brand.name"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card width="">
            <v-data-table
              :items="brands"
              :headers="headers"
              :pagination.sync="pagination"
              :rows-per-page-items=[10]
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="editItem(props.item)">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
              <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
          </v-card>
        </div>        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  created () {
    this.fecthData()
  },

  data () {
    return {
      brand: {
        name: null,
        id: null
      },
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Actions',
          sortable: false,
          value: 'name'
        }
      ],
      dialog: false,
      pagination: {}
    }
  },

  methods: {
    ...mapActions(['createBrand', 'updateBrand', 'removeBrand']),
    fecthData () {
      this.$store.dispatch('loadBrands')
    },
    editItem (item) {
      this.brand.name = item.name
      this.brand.id = item.id || null
      this.dialog = true
    },
    deleteItem (item) {
      confirm('Are you sure you want to delete this item?') && this.removeBrand(item.id)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.brand = {
          name: null,
          id: null
        }
      }, 300)
    },
    save () {
      if (this.brand.id !== null) {
        this.updateBrand(this.brand)
      } else {
        // console.log(this.brand.name)
        this.createBrand(this.brand)
      }
      this.close()
    }
  },

  computed: {
    ...mapState({
      brands: state => state.Brands.loadedBrands
    }),
    formTitle () {
      return this.brand.id === null ? 'New Brand' : 'Edit Brand'
    },
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  }
}
</script>

<style>

</style>
