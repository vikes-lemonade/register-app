<template>
  <div>
      <form>
        <v-text-field label="Employee ID" v-model="id" required></v-text-field>
        <v-text-field label="Password" v-model="password" required></v-text-field>
        <v-btn @click="login">Submit</v-btn>
      </form>
  </div>
</template>

<script>
  export default {
    data: () => ({
      id: "",
      password: ""
    }),
    methods: {
      login(){
        this.$router.replace({ name:"index" })
      }
    }
  }
</script>
