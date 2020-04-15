<template>
  <div>
    <v-snackbar v-model="showSnack" :timeout="5000" top color="error">
      {{snackText}}<v-spacer/>&nbsp;<v-icon @click="showSnack = false">close</v-icon>
    </v-snackbar>
    <v-row justify="space-around" align="center">
      <v-col cols="12">
        <v-card color="accent">
<!--          <v-card-title>-->
<!--            <div class="display-1 font-weight-lighter white&#45;&#45;text">Product Listings</div>-->
<!--            <v-spacer/>-->
<!--            <v-btn color="deep-purple darken-3 white&#45;&#45;text" @click="addProduct"><v-icon>add</v-icon>&nbsp; Create New Product</v-btn>-->
<!--          </v-card-title>-->
          <v-card-title>
            Products
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items=productData
            :search="search"
            :show-select=true
          ></v-data-table>
          <v-btn color="deep-purple darken-3 white--text" @click="addProduct"><v-icon>add</v-icon>&nbsp; Create New Product</v-btn>
          <v-btn color="deep-purple darken-3 white--text" @click=""><v-icon>add</v-icon> Add to Cart</v-btn>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Products",
  props: [],
  data: () => ({
    showSnack: false,
    snackText: "",
    search: "",
    headers: [
      {
        text: 'Product Name',
        align: 'start',
        sortable: false,
        value: 'lookup_code',
      },
      { text: 'Created', value: 'creation' },
      { text: 'Inventory', value: 'count' },
      { text: 'ID', value: 'id' },
      {text: 'Price', value: '100'}
    ],

  }),
  computed: {
    ...mapGetters({
      productData: 'getProducts',
      employeeData: 'getEmployee'
    }),
  },
  methods: {
    addProduct() {
      if (this.employeeData.classification === 1 || this.employeeData.classification === 2) {
        this.snackText = "This function is not quite ready for action yet"
        this.showSnack = true
      } else {
        this.snackText = "You must be a manager to create a new product"
        this.showSnack = true
      }
    }
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
}


</style>
