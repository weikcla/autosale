<template>
  <v-container grid-list-xl>
    <v-layout>
      <v-flex xs12>
        <v-card color="blue-grey lighten-3">
          <v-container>
            <v-layout>
              <v-flex>
                 <h1>Atributes</h1>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex text-xs-right>
                <v-btn color="primary" class="mb-2" @click="modal = true">New atribute</v-btn>
              </v-flex>
            </v-layout>
            <v-data-table
              :items="atributes"
              :headers="headers"
              :pagination.sync="pagination"
              :rows-per-page-items=[10]
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.atributeName }}</td>
                <td>{{ props.item.type }}</td>
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
              <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
          </v-container>
        </v-card>
      </v-flex>
      <v-dialog v-model="modal" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs6>
                  <v-select
                    label="Type"
                    :items="types"
                    item-text="name"
                    item-value="id"
                    v-model="atribute.type"
                    :disabled="atribute.id !== null"
                  ></v-select>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs6>
                  <v-text-field 
                    label="Atribute name"
                    v-model="atribute.name">
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
    </v-layout>
  </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  created () {
    this.$store.dispatch('loadAtributes')
  },

  data () {
    return {
      atribute: {
        type: null,
        name: null,
        id: null
      },
      headers: [
        {
          text: 'Atribute',
          value: 'atributeName'
        },
        {
          text: 'Type',
          value: 'type'
        },
        {
          text: 'Actions',
          sortable: false,
          align: 'right'
        }
      ],
      modal: false,
      pagination: {}
    }
  },

  methods: {
    ...mapActions(['createAtribute', 'updateAtribute', 'removeAtribute']),
    editItem (item) {
      if (item.id !== null) {
        this.atribute.name = item.atributeName
        this.atribute.id = item.atributeId
        this.atribute.type = item.type
        this.modal = true
      } else {
        this.atribute.id = item.atributeId
        this.atribute.type = item.type
        this.modal = true
      }
    },
    deleteItem (item) {
      this.atribute.type = item.type
      this.atribute.id = item.atributeId
      return confirm('Are you sure you want to delete this atribute "' + item.atributeName + '"?') && this.removeAtribute(this.atribute)
    },
    save () {
      if (this.atribute.id !== null) {
        this.updateAtribute(this.atribute)
      } else {
        this.createAtribute(this.atribute)
      }
      this.close()
    },
    close () {
      this.modal = false
      setTimeout(() => {
        this.atribute = {
          type: null,
          name: null,
          id: null
        }
      }, 300)
    }
  },

  computed: {
    ...mapState({
      types: state => state.Atributes.types,
      atributes: state => state.Atributes.atributes
    }),
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    formTitle () {
      return this.atribute.id === null ? 'New Atribute' : 'Edit Atribute'
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
