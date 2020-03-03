<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="10">
          <create-employee></create-employee>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import CreateEmployee from "../components/employee/CreateEmployee";

  export default {
    name: 'EmployeeManagerComponent',
    components: {
      CreateEmployee
    },
    mounted() {
      if (localStorage.getItem('employee') === null && this.$store.getters.getEmployeeCount > 0) {
        this.$router.push({name: 'login'})
      }
    }
  }
</script>
