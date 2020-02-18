<template>
  <div>
    <v-row justify="space-around" align="center">
      <v-col cols="12">
        <v-card color="accent">
          <v-card-title>
            <div class="display-1 font-weight-lighter white--text">Product Listings</div>
            <v-spacer/>
            <v-btn color="deep-purple darken-3 white--text"><v-icon>add</v-icon>&nbsp; Create New Product</v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-iterator :items="productData" hide-default-footer>
              <template v-slot:default="props">
                <v-row>
                  <v-col v-for="(product, index) in props.items" :key="product.id" cols="12" sm="6" md="4" lg="4">
                    <v-hover v-slot:default="{ hover }">
                      <v-card id="productCard" :elevation="hover ? 16 : 2" tile color="grey lighten-1 black--text">
                        <v-card-title class="justify-center title">Product {{index+1}}</v-card-title>
                        <v-divider></v-divider>
                        <v-expand-transition>
                          <div v-if="hover"
                            class="d-flex transition-fast-in-fast-out deep-purple darken-2 v-card--reveal display-1 font-weight-medium white--text"
                            style="height: 100%;">
                            Click to View Product
                          </div>
                        </v-expand-transition>
                        <v-card-text>
                          <v-list-item>
                            <v-list-item-content>Product ID:</v-list-item-content>
                            <v-list-item-content class="align-end">{{product.id}}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>Count:</v-list-item-content>
                            <v-list-item-content class="align-end">{{product.count}}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>Lookup Code:</v-list-item-content>
                            <v-list-item-content class="align-end">{{product.lookup_code}}</v-list-item-content>
                          </v-list-item>

                          <v-list-item>
                            <v-list-item-content>Created:</v-list-item-content>
                            <v-list-item-content class="align-end">{{new Date(product.creation).toLocaleString()}}
                            </v-list-item-content>
                          </v-list-item>
                        </v-card-text>
                      </v-card>
                    </v-hover>
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
export default {
  name: "Products",
  props: ["productData"],
  data: () => ({

  })
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