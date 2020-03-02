<template>
  <!--  <v-container>-->
  <!--    <div>-->
  <!--      <b-card no-body>-->
  <!--        <b-tabs card>-->
  <!--          <b-tab title="Tab 1" active>-->
  <!--            <b-card-text>Tab contents 1</b-card-text>-->
  <!--          </b-tab>-->
  <!--          <b-tab title="Tab 2">-->
  <!--            <b-card-text>Tab contents 2</b-card-text>-->
  <!--          </b-tab>-->
  <!--        </b-tabs>-->
  <!--      </b-card>-->
  <!--    </div>-->
  <!--  </v-container>-->

  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Create Employee" active>
          <v-container>
            <create_employee></create_employee>
          </v-container>
        </b-tab>
        <b-tab title="Update Employee">
          <v-container>
            <update_employee></update_employee>
          </v-container>
        </b-tab>
        <b-tab title="Delete Employee">
          <v-container>
            <delete_employee></delete_employee>
          </v-container>
        </b-tab>
        <b-tab title="Query Employee">
          <v-container>
            <query_employee.vue></query_employee.vue>
          </v-container>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
  import create_employee from "../components/employee/create_employee"
  import delete_employee from "../components/employee/delete_employee";
  import update_employee from "../components/employee/update_employee";
  import query_employee from "../components/employee/query_employee";

  export default {
    layout: 'withoutmenu',
    components: {
      query_employee,
      update_employee,
      delete_employee,
      create_employee
    },
    data: () => ({message: 'Hello Vue!'}),
    methods: {}
  }
</script>
