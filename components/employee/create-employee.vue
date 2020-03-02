<template>
  <div>
    <v-row align="center" justify="space-around">
      <v-col cols="8">
        <v-card>
          <v-form ref="form" v-model="valid" class="pa-6">
            <v-text-field label="First Name" v-model="firstName" :rules="nameRules"
                          v-on:keyup.enter="validate"></v-text-field>
            <v-text-field label="Last Name" v-model="lastName" :rules="nameRules"
                          v-on:keyup.enter="validate"></v-text-field>
            <v-text-field label="Password" v-model="password" :rules="rules" type="password"
                          v-on:keyup.enter="validate"></v-text-field>
            <v-text-field label="Confirm Password" v-model="confirmPassword" :rules="rules" type="password"
                          v-on:keyup.enter="validate"></v-text-field>
            <div>
              <v-radio-group v-model="selected" hide-details>
                <v-radio value="Cashier" label="Cashier"></v-radio>
                <v-radio value="Shift Manager" label="Shift Manager"></v-radio>
                <v-radio value="General Manager" label="General Manager"></v-radio>
              </v-radio-group>
              <div class="mt-3">Employee Type: <strong>{{ selected }}</strong>
                <v-btn @click="validate" :disabled="!valid" style="float: right;">Submit</v-btn>
              </div>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

  export default {
    computed: {
      rules() {
        const rules = [];

        if (this.max) {
          const rule =
            v => (v || '').length <= this.max ||
              `A maximum of ${this.max} characters is allowed`;
          rules.push(rule)
        }

        if (!this.allowSpaces) {
          const rule =
            v => (v || '').indexOf(' ') < 0 ||
              'No spaces are allowed';
          rules.push(rule)
        }
        if (this.confirmPassword) {
          const rule =
            v => (!!v && v) === this.password ||
              'Values do not match';
          rules.push(rule)
        }
        return rules
      },
    },
    watch: {
      match: 'validateField',
      max: 'validateField',
      model: 'validateField',
    },

    data: () => ({
      valid: true,
      allowSpaces: false,
      firstName: '',
      lastName: '',
      selected: '',

      nameRules: [
        v => !!v || 'Name must not be empty',
        v => (v || '').indexOf(' ') < 0 ||
          'No spaces are allowed'
      ],
      password: '',
      confirmPassword: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.password === v.confirmPassword || 'Passwords must match'
      ],
      snackbar: false,
      text: '',
      loading: false
    }),


    // mounted: function () {
    //   if (!((this.$store.getters.getEmployees.length))) {
    //     this.$router.push({name: 'register'})
    //   } else if (localStorage.getItem('employee') !== null) {
    //     this.$router.push({name: 'index'})
    //   }
    // },
    methods: {

      async createEmployee() {

        let url = `https://peaceful-bastion-45955.herokuapp.com/api/v1/employee/create`
        this.loading = true

        // employeeData = {
        //   "active": true,
        //   "classification": this.selected,
        //   "employeeid":,
        //   "firstname": this.firstname,
        //   "lastname": this.lastname,
        //   "managerid": '',
        //   "password": this.password
        //
        // }


        // await this.$axios.post(url,employeeData)
        //   .then(response => {
        //     if (response.data[0].password === this.password) {
        //       this.$store.commit('SET_EMPLOYEE', response)
        //       this.$store.dispatch('STORE_LOCAL')
        //       this.$router.push({name: "index"})
        //     } else {
        //       this.text = 'Invalid password'
        //       this.snackbar = true
        //       this.loading = false
        //     }
        //   })
        //   .catch(err => {
        //     this.text = 'Invalid ID'
        //     this.snackbar = true
        //     this.loading = false
        //   })
      },
      validate() {
        if (this.$refs.form.validate()) {
          // this.createEmployee()

        }
      }
    }
  }
</script>
