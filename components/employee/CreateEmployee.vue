<template>
  <div>
    <v-row align="center" justify="space-around">
      <v-col cols="8">
        <v-alert color="info" v-model="initialEmployee" icon="info">You must create an initial employee before you can login.</v-alert>
        <v-card>
          <v-card-title>Employee Create</v-card-title>
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
                <v-btn @click="validate" :disabled="!valid" style="float: right;" :loading="loading">Submit</v-btn>
              </div>
            </div>
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

  export default {
    computed: {
      initialEmployee() {
        return (this.$store.getters.getEmployeeCount === 0)
      },
      rules() {
        const rules = [];

        if (this.max) {
          const rule =
            v => (v || '').length <= this.max ||
              `A maximum of ${this.max} characters is allowed`;
          rules.push(rule)
        }

        if (this.password || this.confirmPassword === '') {
          const rule = v => !!v || 'The password must not be empty';
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
      selected: 'Cashier',
      valid: true,
      allowSpaces: false,
      firstName: '',
      lastName: '',
      password: '',
      employeeid: 'temp employeeid',
      confirmPassword: '',

      nameRules: [
        v => !!v || 'Name must not be empty',
        v => (v || '').indexOf(' ') < 0 ||
          'No spaces are allowed'
      ],

      snackbar: false,
      text: '',
      loading: false
    }),
    methods: {

      async createEmployee() {

        let url = `https://peaceful-bastion-45955.herokuapp.com/api/v1/employee/create`
        this.loading = true

        let classification = 1

        if (this.selected == 'Cashier') {
          classification = 3

        } else if (this.selected == 'Shift Manager') {
          classification = 2
        }

        let employeeData = {
          "active": true,
          "classification": classification,
          "firstname": this.firstName,
          "lastname": this.lastName,
          "managerid": '',
          "password": this.password
        }


        await this.$axios.post(url, employeeData)
          .then(response => {
            if (response.data.firstname === this.firstName) {
              alert(`Your Employee ID is: ${response.data.employeeid}\n Please write this down to use when logging in.`)
            } else {
              this.text = 'Invalid password'
              this.snackbar = true
              this.loading = false
            }
          })
          .catch(err => {
            this.text = 'Invalid Create'
            this.snackbar = true
            this.loading = false
          })

        await this.$store.dispatch("FETCH_EMPLOYEES")
        if (this.$store.getters.getEmployeeCount == 1) {
          this.$router.push({name: "login"})
        } else {
          //  Do nothing not an initial employee.
          console.log('Do nothing not an initial employee')
        }

      },
      validate() {
        if (this.$refs.form.validate()) {
          this.createEmployee()
        }
      }
    }
  }
</script>
