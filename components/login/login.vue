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
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="space-around" class="pt-6">
      <pulse-loader :loading="loading" color="#AB47BC"></pulse-loader>
    </v-row>
  </div>
</template>

<script>
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
  export default {
    components: {
      PulseLoader
    },
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
      text: '',
      loading: false
    }),
    mounted:function(){
      if(!((this.$store.getters.getEmployees.length))){
        this.$router.push({name: 'register'})
      }
      else if(localStorage.getItem('employee') !== null){
        this.$router.push({name: 'index'})
      }
    },
    methods: {
      async login() {
        let url = `https://peaceful-bastion-45955.herokuapp.com/api/v1/employee?employeeid=${this.id}`
        this.loading = true
        await this.$axios.get(url)
          .then(response => {
            if (response.data[0].password === this.password) {
              this.$store.commit('SET_EMPLOYEE',response)
              this.$store.dispatch('STORE_LOCAL')
              this.$router.push({name: "index"})
            } else {
              this.text = 'Invalid password'
              this.snackbar = true
              this.loading = false
            }
          })
          .catch(err => {
            this.text = 'Invalid ID'
            this.snackbar = true
            this.loading = false
          })
      },
      validate() {
        if (this.$refs.form.validate()) {
          this.login()
        }
      }
    }
  }
</script>
