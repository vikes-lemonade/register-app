<template>
  <div>
    <v-row align="center" justify="space-around">
      <v-col cols="8">
        <v-card>
         <v-form class="pa-6">
           <v-text-field label="Employee ID" v-model="id" required></v-text-field>
           <v-text-field label="Password" v-model="password" required></v-text-field>
           <v-btn @click="login">Submit</v-btn>
         </v-form>
        </v-card>
      </v-col>
    </v-row>
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
        this.$router.push({name: "index"})
      }
    }
  }
</script>
