<template>
  <div>
    <v-snackbar v-model="showSnack" :timeout="5000" top color="error">
      {{ snackText }}<v-spacer />&nbsp;<v-icon @click="showSnack = false"
        >close</v-icon
      >
    </v-snackbar>
    <v-row justify="space-around" align="center">
      <v-col cols="12">
        <v-card color="grey darken-4">
          <v-card-title>
            <v-row align="center" justify="space-between" dense>
              <v-col cols="3">
                <div class="display-1 white--text">Product Listings</div>
              </v-col>
              <v-col cols="6">
                <v-row justify="center" dense>
                  <v-responsive
                    class="mr-0 mr-md-6 hidden-xs-only transition-swing"
                    :max-width="textFieldWidth"
                  >
                    <v-text-field
                      v-model="searchStr"
                      label="Search for a product..."
                      hide-details
                      single-line
                      solo-inverted
                      rounded
                      dense
                      flat
                      prepend-inner-icon="search"
                      @focusin="textFieldWidth = '600px'"
                      @focusout="textFieldWidth = '500px'"
                    />
                  </v-responsive>
                </v-row>
              </v-col>
              <v-col cols="3">
                <v-btn
                  v-if="canCreate"
                  color="deep-purple darken-3 white--text"
                  @click="createProduct"
                  block
                  >
                  <v-icon>add</v-icon>
                  &nbsp; Create New Product
                </v-btn>
                <create-product :show-create="showCreate" v-on:closeCreate="closeCreate" v-on:createdProduct="refreshProducts" />
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-data-iterator
              :items="productData"
              :search="searchStr"
              hide-default-footer
            >
              <template v-slot:default="props">
                <v-row>
                  <v-col
                    v-for="(product, index) in props.items"
                    :key="product.id"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="4"
                  >
                    <v-card
                      id="productCard"
                      elevation="10"
                      tile
                      color="grey darken-1"
                    >
                      <v-card-title>
                        <v-row justify="space-between" dense>
                          <v-col cols="4">
                            <span class="title">Product {{ index + 1 }}</span>
                          </v-col>
                          <v-col lg="5" md="8" v-if="productBeingAdded.lookup_code !== product.lookup_code">
                            <v-btn
                              color="secondary"
                              @click="selectProductQuantity(product)"
                            >
                              <v-icon>add</v-icon>&nbsp;Add to Cart
                            </v-btn>
                          </v-col>
                          <v-col cols="8" v-else>
                            <v-row dense justify="space-around">
                              <v-col cols="8">
                                <v-select
                                  :items="quantityRange"
                                  hint="Select Quantity"
                                  dense
                                  persistent-hint
                                  v-model="productBeingAdded.quantitySelected"
                                  prepend-icon="remove"
                                  append-outer-icon="add"
                                  @click:prepend="productBeingAdded.quantitySelected--"
                                  @click:append-outer="productBeingAdded.quantitySelected++"
                                />
                              </v-col>
                              <v-col cols="2">
                                <v-btn icon color="error" @click="cancelAddingProduct">
                                  <v-icon>cancel</v-icon>
                                </v-btn>
                              </v-col>
                              <v-col cols="2">
                                <v-btn icon color="success" @click="addProductToCart">
                                  <v-icon>check</v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-card-title>
                      <v-divider class="my-auto" />
                      <v-card-text>
                        <v-list-item>
                          <v-list-item-content
                            >Lookup Code:</v-list-item-content
                          >
                          <v-list-item-content class="align-end">{{
                            product.lookup_code
                          }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                          <v-list-item-content>Product ID:</v-list-item-content>
                          <v-list-item-content class="align-end">{{
                            product.id
                          }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                          <v-list-item-content>Count:</v-list-item-content>
                          <v-list-item-content class="align-end">{{
                            product.count
                          }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                          <v-list-item-content>Price:</v-list-item-content>
                          <v-list-item-content class="align-end">{{
                            product.price
                          }}</v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                          <v-list-item-content>Created:</v-list-item-content>
                          <v-list-item-content class="align-end"
                            >{{ new Date(product.creation).toLocaleString() }}
                          </v-list-item-content>
                        </v-list-item>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CreateProduct from "./CreateProduct";
import EventBus from "../../src/event-bus";

export default {
  name: "Products",
  components: { CreateProduct },
  props: [],
  data: () => ({
    searchStr: "",
    showSnack: false,
    textFieldWidth: "500px",
    snackText: "",
    canCreate: false,
    showCreate: false,
    productBeingAdded: {
      lookup_code: null,
      id: 0,
      price: 0,
      count: 0,
      created: null,
      quantitySelected: 1,
      selectingQuantity: false
    }
  }),
  computed: {
    ...mapGetters({
      productData: "getProducts",
      employeeData: "getEmployee"
    }),
    quantityRange() {
      return [...Array(this.productBeingAdded.count).keys()].slice(1, this.productBeingAdded.count)
    }
  },
  mounted() {
    this.$store.dispatch("RETRIEVE_LOCAL")
    if (this.employeeData.classification === 1 || this.employeeData.classification === 2) {
      this.canCreate = true
    }
  },
  methods: {
    refreshProducts() {
      this.showCreate = false
      this.$store.dispatch("FETCH_PRODUCTS")
    },
    createProduct() {
      this.showCreate = true
    },
    closeCreate() {
      this.showCreate = false
    },
    addProductToCart() {
      let item = {
        id: this.productBeingAdded.lookup_code,
        productId: this.productBeingAdded.id,
        price: this.productBeingAdded.price,
        count: this.productBeingAdded.quantitySelected
      }

      EventBus.$emit('addProduct', item)

      this.productBeingAdded = {
        lookup_code: null,
        id: 0,
        price: 0,
        count: 0,
        created: null,
        quantitySelected: 0,
        selectingQuantity: false
      }
    },
    selectProductQuantity(product) {
      this.productBeingAdded = {
        lookup_code: product.lookup_code,
        id: product.id,
        price: product.price,
        count: product.count,
        created: product.created,
        quantitySelected: 1,
        selectingQuantity: true
      }
    },
    cancelAddingProduct() {
      this.productBeingAdded = {
        lookup_code: null,
        id: 0,
        price: 0,
        count: 0,
        created: null,
        quantitySelected: 1,
        selectingQuantity: false
      }
    }
  }
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}

.transition-swing {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
</style>
