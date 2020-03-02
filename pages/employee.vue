<template>
<body>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Create Employee" active>
          <v-container>
          <create_employee></create_employee>
          </v-container>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
  </body>
</template>

<script>
  import create_employee from "../components/employee/create_employee";

  export default {
    name: 'EmployeeManagerComponent',
    layout: 'withoutmenu',
    components: {
      create_employee
    }
  }
</script>
