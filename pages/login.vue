<template>
  <v-container>
    <login></login>
  </v-container>
</template>

<script>
  import login from "../components/login/login"
  export default {
    layout: 'withoutmenu',
    components: {
      login
    },
    data: () => ({
    }),
    methods: {
    }
  }
</script>
