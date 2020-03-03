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
  import createEmployee from "../components/employee/create-employee";

  export default {
    name: 'EmployeeManagerComponent',
    components: {
      createEmployee
    }
  }
</script>
