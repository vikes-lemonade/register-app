<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="10">
          <products :productData="productData"></products>
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
  // async asyncData({store}) {
  //   await store.dispatch("SomeRandomAction")
  // },
  //
  methods: {

  },
  async asyncData({ $axios }) {
    const data = await $axios.$get('https://peaceful-bastion-45955.herokuapp.com/api/v1/products/all')
    return { productData:data }
  }
}
</script>
