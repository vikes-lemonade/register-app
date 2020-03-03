<template>
  <v-container>
    <login-form></login-form>
  </v-container>
</template>

<script>
  import LoginForm from "../components/login/LoginForm"
  export default {
    layout: 'withoutmenu',
    components: {
      LoginForm
    },
    data: () => ({
    }),
    mounted() {
      if (this.$store.getters.getEmployeeCount <= 0) {
        this.$router.push({name: 'employee'})
      } else if (localStorage.getItem('employee') !== null) {
        this.$router.push({name: 'index'})
      }
    },
  }
</script>
