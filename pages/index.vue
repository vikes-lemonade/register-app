<template>
  <div>
    <v-card>
       <v-card-title>
         This is a card
       </v-card-title>
        {{ ip }}
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
    const ip = await $axios.$get('http://icanhazip.com')
    return { ip }
  }
}
</script>
