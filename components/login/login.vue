<template>
  <div>
    <v-row align="center" justify="space-around">
      <v-col cols="8">
        <v-card>
         <v-form ref="form" v-model="valid" class="pa-6">
           <v-text-field label="Employee ID" v-model="id" :rules="idRules" v-on:keyup.enter="validate"></v-text-field>
           <v-text-field label="Password" v-model="password" :rules="passwordRules" type="password" v-on:keyup.enter="validate"></v-text-field>
           <v-btn @click="validate" :disabled="!valid">Submit</v-btn>
         </v-form>
          <v-snackbar v-model="snackbar" color="red darken-1">
            {{ text }}
            <v-btn text @click="snackbar = false">
              Close
            </v-btn>
          </v-snackbar>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data: () => ({
      valid: true,
      id: '',
      idRules: [
        v => !!v || 'ID is required',
        v => Number.isInteger(Number(v)) || 'Value must be a number'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      snackbar: false,
      text: ''
    }),
    methods: {
      fetch(url){
          return axios.get(url)
      },
      async login(){
        if((this.id.localeCompare("") != 0) && (this.password.localeCompare("") != 0)) {
          let user = []
          try {
            let url = 'https://peaceful-bastion-45955.herokuapp.com/api/v1/employee?employeeid='
            url = url.concat(this.id)
            user = await this.fetch(url)
            if (user.data[0].password == this.password) {
              await this.$router.push({name: "index"})
            } else {
              this.text = 'Invalid password'
              this.snackbar = true
            }
          }
          catch(e){
            this.text = 'Invalid ID'
            this.snackbar = true
            return
          }
        }
      },
      validate(){
        if(this.$refs.form.validate()){
          this.login()
        }
      }
    }
  }
</script>
