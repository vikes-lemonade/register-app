<template>
  <div>
    <v-card>
       <v-card-title>
         This is a card
       </v-card-title>
      <ul>
        <li v-for="product in products" class ="items">
          Id: {{product.id}}, Count: {{product.count}}, Lookup-code: {{String(product.lookup-code)}}, Created: {{product.creation}}
        </li>
      </ul>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({

  }),
  // async asyncData({store}) {
  //   await store.dispatch("SomeRandomAction")
  // },
  methods: {

  },
  async asyncData({ $axios }) {
    const data = await $axios.$get('http://testvirt101.herokuapp.com/api/v1/products/all')
    return { products:data }
  }
}
</script>
