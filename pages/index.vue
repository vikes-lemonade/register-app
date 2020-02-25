<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="10">
          <products></products>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import products from "../components/products/products"

export default {
  components: {
    products
  },
  data: () => ({

  }),
  async asyncData({store}) {
     await store.dispatch("FETCH_PRODUCTS")
  },
}
</script>
