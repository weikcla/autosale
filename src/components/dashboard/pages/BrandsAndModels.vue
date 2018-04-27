<template>
  <v-container grid-list-xl>
    <v-layout row wrap text-center>
      <v-flex xs12 sm6>
        <v-card color="blue-grey lighten-3">
          <v-container>
            <v-layout>
              <v-flex>
                 <h1>Brands</h1>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex text-xs-right>
                <v-btn color="primary" class="mb-2" @click="dialog('brand')">New Brand</v-btn>
              </v-flex>
            </v-layout>
            <v-data-table
              :items="brands"
              :headers="bHeaders"
              :pagination.sync="bPagination"
              :rows-per-page-items=[10]
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right px-2">
                  <v-btn icon class="mx-0" @click="editItem(props.item, 'brand')">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteItem(props.item, 'brand')">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
              <v-pagination v-model="bPagination.page" :length="pages(bPagination)"></v-pagination>
            </div>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card color="blue-grey lighten-3">
          <v-container>
            <v-layout>
              <v-flex>
                 <h1>Models</h1>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex text-xs-right>
                <v-btn color="primary" class="mb-2" @click="dialog()">New Model</v-btn>
              </v-flex>
            </v-layout>
            <v-data-table
              :items="models"
              :headers="mHeaders"
              :pagination.sync="mPagination"
              :rows-per-page-items=[10]
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.modelName }}</td>
                <td>{{ props.item.brandName }}</td>
                <td class="text-xs-right px-2">
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
              <v-pagination v-model="mPagination.page" :length="pages(mPagination)"></v-pagination>
            </div>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex>
        <v-dialog v-model="modal" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout v-if="isBrand" wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="Brand name"
                      v-model="brand.name">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout v-else wrap>
                  <v-flex xs6>
                    <v-select
                      label="Brand"
                      :items="brands"
                      item-text="name"
                      item-value="key"
                      v-model="model.brand"
                      :disabled="model.id !== null"
                    ></v-select>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs6>
                    <v-text-field 
                      label="Model name"
                      v-model="model.name">
                    </v-text-field>
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
      model: {
        brand: {
          name: null,
          id: null
        },
        name: null,
        id: null
      },
      bHeaders: [
        {
          text: 'Brand',
          value: 'name'
        },
        {
          text: 'Actions',
          align: 'right',
          sortable: false
        }
      ],
      mHeaders: [
        {
          text: 'Model',
          value: 'modelName'
        },
        {
          text: 'Brand',
          value: 'brandName'
        },
        {
          text: 'Actions',
          sortable: false,
          align: 'right'
        }
      ],
      modal: false,
      isBrand: false,
      bPagination: {},
      mPagination: {}
    }
  },

  methods: {
    ...mapActions(['createBrand', 'createModel', 'updateBrand', 'updateModel', 'removeBrand', 'removeModel']),
    fecthData () {
      this.$store.dispatch('loadBrands')
      this.$store.dispatch('loadModels')
    },
    editItem (item, is) {
      if (is === 'brand') {
        this.brand.name = item.name
        this.brand.id = item.id || null
        this.isBrand = true
        this.modal = true
      } else {
        this.brand.name = item.brandName
        this.model.brand = item.brandId
        this.model.name = item.modelName
        this.model.id = item.modelId || null
        this.isBrand = false
        this.modal = true
      }
    },
    deleteItem (item, is) {
      if (is === 'brand') {
        confirm('Are you sure you want to delete this brand "' + item.name + '"?') && this.removeBrand(item.id)
      } else {
        this.model.brand = item.brandId
        this.model.id = item.modelId
        confirm('Are you sure you want to delete this model "' + item.modelName + '"?') && this.removeModel(this.model)
      }
    },
    save () {
      if (this.brand.id !== null && this.isBrand === true) {
        this.updateBrand(this.brand)
      } else if (this.isBrand === true) {
        this.createBrand(this.brand)
      } else if (this.model.id !== null) {
        this.updateModel(this.model)
      } else {
        this.createModel(this.model)
      }
      this.close()
    },
    close () {
      this.modal = false
      setTimeout(() => {
        this.brand = {
          name: null,
          id: null
        }
        this.model = {
          brand: '',
          name: null,
          id: null
        }
      }, 500)
    },
    pages (pagination) {
      if (pagination.rowsPerPage == null ||
        pagination.totalItems == null
      ) return 0
      return Math.ceil(pagination.totalItems / pagination.rowsPerPage)
    },
    dialog (is) {
      if (is === 'brand') {
        this.isBrand = true
        return (this.modal = true)
      } else {
        this.isBrand = false
        return (this.modal = true)
      }
    }
  },

  computed: {
    ...mapState({
      brands: state => state.Brands.loadedBrands,
      models: state => state.Models.loadedModels
    }),
    // ...mapMutations(['rules']),
    formTitle () {
      if (this.isBrand) {
        return this.brand.id === null ? 'New Brand' : 'Edit Brand'
      } else {
        return this.model.id === null ? 'New Model' : 'Edit Model'
      }
    }
  },

  watch: {
    modal (val) {
      val || this.close()
    }
  }
}
</script>

<style>

</style>
