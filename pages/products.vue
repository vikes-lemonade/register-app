<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="10">
          <product-list></product-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductList from "../components/products/ProductList"

export default {
  name: "Products",
  components: { ProductList },
  data: () => ({

  }),
  async asyncData({store}) {
     await store.dispatch("FETCH_PRODUCTS")
  },
}
</script>

<style>

</style>