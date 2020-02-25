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
  import axios from 'axios'
  export default {
    data: () => ({
      id: "",
      password: ""
    }),
    methods: {
      fetch(url){
          return axios.get(url)
      },
      async login(){
        if((this.id.localeCompare("") != 0) && (this.password.localeCompare("") != 0)) {
          let user = []
          try {
            let url = 'http://peaceful-bastion-45955.herokuapp.com/api/v1/employee?employeeid='
            url = url.concat(this.id)
            user = await this.fetch(url)
          }
          catch(e){
            console.log('invalid ID')
            return
          }
          console.log(user)
          if(user.data[0].password == this.password){
            console.log('correct password')
            await this.$router.push({name: "index"})
          }
          else{
            console.log('incorrect password')
          }
        }
      }
    }
  }
</script>
