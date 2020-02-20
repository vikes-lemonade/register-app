<template>
  <v-app dark style="background-color: #BDBDBD">
    <v-toolbar>
      <v-toolbar-title headline font-weight-light>Register App</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn v-for="(item, index) in items" :key="index" :to="item.to" text>
          <v-icon>{{item.icon}}</v-icon>{{item.title}}
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'person_outline',
          title: 'Login',
          to: '/login'
        }
      ],
    }
  }
}
</script>
